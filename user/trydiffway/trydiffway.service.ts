import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { WarningMsg } from "../../warningmsg";
import { UserService } from "../user.service";
import { AuthService } from "../../auth/auth.service";
import * as _ from "lodash";
import { ModuleRef } from "@nestjs/core";
import { TwilloService } from "../../twillo/twillo.service";

@Injectable()
export class TrydiffwayService {
  private userService: UserService;
  constructor(
    private moduleref: ModuleRef,
    private twilloService: TwilloService,
    private readonly authService: AuthService
  ) { }

  onModuleInit() {
    this.userService = this.moduleref.get(UserService, { strict: false });
  }

  async getDetails(phoneNumber: string, option: string) {
    const user = await this.validatePhoneNo(phoneNumber);
    if (_.lowerCase(option) == "email") {
      if(user.email){
        const maskedEmail =  await this.getMaskedEmail(user)
        if(!_.isEmpty(maskedEmail) && maskedEmail.MaskedEmail != ''){
          return { httpStatus: HttpStatus.OK, data: { isEmailExist:true,maskedEmail}}; 
        }else{
          return { httpStatus: HttpStatus.OK, data: { isEmailExist:false,message: WarningMsg.emailNotExist}};      
        }
      } else {
        return { httpStatus: HttpStatus.OK, data: { isEmailExist:false,message: WarningMsg.emailNotExist}};      
      }
    }
    else if(_.lowerCase(option) == 'security') {
      const securityQus =  await this.getSecurityQestions(user);
      if(!_.isEmpty(securityQus) && securityQus.securityQestion1){
        return { httpStatus: HttpStatus.OK, data: {isSecurityQusExist:true,securityQus }};         
      }else{
        return { httpStatus: HttpStatus.OK, data: { isSecurityQusExist:false,message: WarningMsg.securityQusNotExist}};
      }
    }
    else{
    return { httpStatus: HttpStatus.NOT_ACCEPTABLE, data: {status:HttpStatus.NOT_ACCEPTABLE, message:WarningMsg.invalidOptions} };
    }
  }

  async getMaskedEmail(user): Promise<any> {
    const payload = { id: user.id };
    const loginToken = await this.generateToken(payload);
    const maskedEmail = this.maskEmail(user.email);
    return { MaskedEmail: maskedEmail, accessToken: loginToken };
  }
  async validatePhoneNo(phoneNumber) {
    const user = await this.userService.findOne({
      where: [
        { primaryMobileNo: phoneNumber },
        { mobileNumber2: phoneNumber },
        { mobileNumber3: phoneNumber },
      ],
    });
    console.log("User Retunrned::::::::::",user)
    if (!user)
      throw new NotFoundException(
        HttpStatus.NOT_FOUND,
        WarningMsg.accountNotRegisterd
      );
    return user;
  }
  async validateEmail(inputEmail, user) {
    try{
    let { attempts, email } = user;
    console.log("attemps-----",attempts);
    
    if (!email)
      return { httpStatus: HttpStatus.OK, data: { isValidEmail: false, message: WarningMsg.emailNotGiven } }

    else if (inputEmail == user.email && attempts < 5) {
      const response = await this.twilloService.sendSMS(email, "email");
      // attempts = 0;
      // await this.userService.updateOne({ id: user.id }, { attempts });
      return { httpStatus: HttpStatus.OK, data: { isValidEmail: true, message: WarningMsg.otpSent } };
    } else {
      if (attempts < 5) {
        attempts = attempts + 1;
        await this.userService.updateOne({ id: user.id }, { attempts });
        return { httpStatus: HttpStatus.OK, data: { isValidEmail: false, message: WarningMsg.emailNotMatched } };
      } else {
        return { httpStatus: HttpStatus.NOT_ACCEPTABLE, data: { isMaxAttempts:true, message: WarningMsg.maxAttempts } };
      }
    }
  }catch(err){
    console.log(err);
    throw err;
  }
  }
  async getSecurityQestions(user) {

    const { securityQestion1, securityQestion2, securityQestion3,
      securityAnswer1, securityAnswer2, securityAnswer3 } = user;
    if (!securityAnswer1 && !securityAnswer2 && !securityAnswer3)
      return { message: WarningMsg.profileNotComplete }
    else {
      const grantToken = await this.generateToken({ id: user.id });
      return {
        securityQestion1,
        securityQestion2,
        securityQestion3,
        accessToken: grantToken,
      };
    }
  }
  async validateSecurityQestion(validReq, user) {
    let { attempts } = user;
    const { securityAnswer1, securityAnswer2, securityAnswer3 } = validReq;
    console.log("Number of Attempts:::::::::",attempts);
    console.log("user:::::::::",user);
    console.log("securityAnswer1:::::::::",securityAnswer1,securityAnswer2,securityAnswer3);
    
    if (attempts >= 5) {
      return { httpStatus: HttpStatus.NOT_ACCEPTABLE, data: { isMaxAttempts:true, message: WarningMsg.maxAttempts } };
    } else {
      if (
        securityAnswer1 == user.securityAnswer1 &&
        securityAnswer2 == user.securityAnswer2 &&
        securityAnswer3 == user.securityAnswer3
      ) {
        attempts = 0;
        await this.userService.updateOne({ id: user.id }, { attempts });
        const grantToken = await this.generateToken({ id: user.id });
        const response  =  { accessToken: grantToken, ...user }
        return { httpStatus: HttpStatus.OK, data: {isValidSecurityQus:true, response }};
      } else {
        console.log("attempts----",attempts);
        if (attempts < 5) {
          attempts = attempts + 1;
          await this.userService.updateOne({ id: user.id }, { attempts });
          return { httpStatus: HttpStatus.OK, data: { isValidSecurityQus:false,message:WarningMsg.securityAnswersNotMatched} };
        } else {
          return { httpStatus: HttpStatus.NOT_ACCEPTABLE, data: { isMaxAttempts:true, message: WarningMsg.maxAttempts } };
        }
      }
    }
  }
  private maskEmail(myemailId: string) {
    return myemailId.replace(
      /^(...)(.*)(@.*)$/,
      (_, a, b, c) => a + b.replace(/./g, "*") + c
    );
  }

  private async generateToken(payload) {
    try {
      const token = await this.authService.generateJWT(payload, {
        secret: process.env.JWT_AUTH_SECRET,
        expiresIn: "1h",
      });
      return token;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
