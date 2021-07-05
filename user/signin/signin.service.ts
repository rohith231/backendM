import {
  Injectable,
  BadRequestException,
  HttpStatus,
  UnauthorizedException,
  InternalServerErrorException,
} from "@nestjs/common";
import { AuthService } from "../../auth/auth.service";
import { User } from "../user.entity";
import { TwilloService } from "../../twillo/twillo.service";
import { UserService } from "../user.service";
import { ModuleRef } from "@nestjs/core";
import * as _ from "lodash";
import { WarningMsg } from "../../warningmsg";

@Injectable()
export class SigninService {
  private userService: UserService;
  constructor(
    private moduleref: ModuleRef,
    private twilloService: TwilloService,
    private authService: AuthService
  ) { }

  onModuleInit() {
    this.userService = this.moduleref.get(UserService, { strict: false });
  }

  async getOtp(phoneNumber: string, channel: string, type: string): Promise<any> {
    try {
      const user = await this.userService.findOne({
        where: [
          { primaryMobileNo: phoneNumber },
          { mobileNumber2: phoneNumber },
          { mobileNumber3: phoneNumber },
        ],
      });
      const isUserExist = user ? true : false;
      if(type == 'l' && user && (user.attempts && user.attempts > 4)){
        return { httpStatus: HttpStatus.NOT_ACCEPTABLE, data: { isMaxAttempts:true, message: WarningMsg.maxAttempts } };
      }
      else if((isUserExist && type && _.lowerCase(type) == 'l') || (type && _.lowerCase(type) == 'r' && !isUserExist)) {        
        const res = await this.twilloService.sendSMS(phoneNumber, channel);
        if (!_.isEmpty(res) && res.status && res.status == "pending") {
          let response = { twilloStatus: res.status, isUserExist };
          response = _.extend(response, { message: WarningMsg.otpSent });
          /** Reset Max Attempt  */
          // if(type == 'l'){
          //   let attempts = 0;
          //   await this.userService.updateOne({ id: user.id }, { attempts });
          // }
          return { httpStatus: HttpStatus.OK, data: response }
        }
        else{
          console.log("Twillio Error-------",res)
          return { httpStatus: HttpStatus.NOT_ACCEPTABLE, data: { status: HttpStatus.NOT_ACCEPTABLE, message: res.twilloError } }
        }        
      } else {
        return { httpStatus: HttpStatus.OK, data: { isUserExist, message:isUserExist ? WarningMsg.userAlreadyExsist: WarningMsg.userNotExist } }
      }
    }
    catch (err) {
      console.log(err); //logger
      throw err;
    }
  }

  async completeProfile(completeProfileRequest, user) {
    try {
      let resUser = await this.userService.findOne(user.id);
      resUser = Object.assign(resUser, { ...completeProfileRequest });
      const status = await this.userService.createUser(resUser);      
      resUser = _.omit(user, ["password", "resetLink", "attempts"]) as User;
      return { ...status };
    } catch (err) {
      console.log(err); //logger
      throw err;
    }
  }
  async loginWithOtp(otp, commMedium) {
    try {
      const response = await this.twilloService.verifyOtp(otp, commMedium);
      let user = {};
      let isOtpValid = response.status == "approved" ? true : false;
      console.log("otp validation---",isOtpValid);
      if (isOtpValid) {
        if (!this.validateEmail(commMedium)) {
          user = await this.userService.findOne({
            where: [
              { primaryMobileNo: commMedium },
              { mobileNumber2: commMedium },
              { mobileNumber3: commMedium },
            ],
          });
        } else {
          user = await this.userService.findOne({ email: commMedium });
        }
         /** Reset Max Attempt  */
         let attempts = 0;
         await this.userService.updateOne({ id: user['id'] }, { attempts });
        if (!user)
        return { httpStatus: HttpStatus.OK, data: { status: HttpStatus.NOT_FOUND, message: WarningMsg.userNotExist } }
        const userInfo =  await this.login(user);
        return { httpStatus: HttpStatus.OK, data: { status: HttpStatus.OK, response: userInfo } };
      }
      else {
        if (!this.validateEmail(commMedium)) {
          user = await this.userService.findOne({
            where: [
              { primaryMobileNo: commMedium },
              { mobileNumber2: commMedium },
              { mobileNumber3: commMedium },
            ],
          });
        } else {
          user = await this.userService.findOne({ email: commMedium });
        }
        
        let attempts = 0;
        if(user){
          attempts = user['attempts'];
          if (attempts < 5) {
            attempts = attempts + 1;
            await this.userService.updateOne({ id: user['id'] }, { attempts });
            return { httpStatus: HttpStatus.OK, data: { isOtpValid, message: WarningMsg.otpNotMatched } };
          } else {
            return { httpStatus: HttpStatus.NOT_ACCEPTABLE, data: { isMaxAttempts:true, message: WarningMsg.maxAttempts } };
          }
        }else{
          return { httpStatus: HttpStatus.OK, data: { status: HttpStatus.NOT_FOUND, message: WarningMsg.userNotExist } }
        }        
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  private async login(user): Promise<any> {
    const payload = { id: user.id };
    const loginToken = await this.signToken(payload);
    const resUser = _.omit(user, ["password", "resetLink", "attempts"]) as User;
    return {
      ...resUser,
      accessToken: loginToken,
      isProfileComplete: this.userService.isProfileComplete(user),
    };
  }

  async loginUserWithEmail(email: string, password: string): Promise<any> {
    const res = await this.validateUserWithEmail(email, password);
    if (this.userService.isUser(res)) return await this.login(res);
    else throw new UnauthorizedException(res);
  }

  async validateUserWithEmail(
    email: string,
    password: string
  ): Promise<User | any> {
    let isUserExist: boolean = false;
    const user = await this.userService.findOne({ email });
    if (user) {
      isUserExist = true;
      const isPasswordMatched = await this.authService.comparePasswords(
        password,
        user.password
      );
      if (isPasswordMatched) {
        const resUser = _.omit(user, ["password", "resetLink"]) as User;
        return resUser;
      } else return { isPasswordMatched };
    }
    return { isUserExist };
  }

  private validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(String(email).toLowerCase());
  }

  private async signToken(payload) {
    try {
      const token = await this.authService.generateJWT(payload, {
        secret: process.env.JWT_AUTH_SECRET,
        expiresIn: "3600s",
      });
      return token;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
