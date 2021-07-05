import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { UserService } from "../user.service";
import { User } from "../user.entity";
import { ModuleRef } from "@nestjs/core";
import { AuthService } from "../../auth/auth.service";
import { TwilloService } from "../../twillo/twillo.service";
import * as _ from "lodash";
import { WarningMsg } from "../../warningmsg";
import * as nodemailer from "nodemailer";
const crypto = require("crypto");

@Injectable()
export class SignupService {
  private userService: UserService;
  private transporter;
  private key = crypto.randomBytes(32).toString("hex");
  constructor(
    private moduleref: ModuleRef,
    private authService: AuthService,
    private twilloService: TwilloService
  ) {
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PASSWORD,
      },
    });
  }

  onModuleInit() {
    this.userService = this.moduleref.get(UserService, { strict: false });
  }

  async createUserWithOtp(user, otp: number) {
    try {
      const isUserExist = await this.validateUser(user);
      if (!isUserExist) {
        const response = await this.twilloService.verifyOtp(
          otp,
          user.phoneNumber
        );
        let isOtpValid = response.status == "approved" ? true : false;
        if (isOtpValid) {
          user = _.chain(user)
            .extend(user, { primaryMobileNo: user.phoneNumber })
            .omit(["phoneNumber"])
            .value();
          let newUser = await this.userService.createUser(user);
          const message = await this.sendVerificationLink(user.email, user.id);
          newUser = _.omit(user, [
            "password",
            "resetLink",
            "attempts",
            "emailState",
          ]);
          const payload = { id: newUser.id };
          const loginToken = await this.signToken(payload);

          return {
            httpStatus: HttpStatus.OK,
            data: {
              accessToken: loginToken,
              twilloStatus: response.status,
              ...newUser,
              emailVerificationMsg: message,
              isProfileComplete: this.userService.isProfileComplete(user),
            },
          };
        } else if (response.status == "pending") {
          return {
            httpStatus: HttpStatus.OK,
            data: { isOtpValid, message: WarningMsg.otpNotMatched },
          };
        } else if (response.twilloError === 404) {
          return {
            httpStatus: HttpStatus.NOT_ACCEPTABLE,
            data: {
              status: HttpStatus.NOT_ACCEPTABLE,
              message: WarningMsg.otpNotMatched,
            },
          };
        } else {
          return {
            httpStatus: HttpStatus.NOT_ACCEPTABLE,
            data: { status: HttpStatus.NOT_ACCEPTABLE, message: response },
          };
        }
      } else {
        return {
          httpStatus: HttpStatus.OK,
          data: { status: HttpStatus.OK, isUserExist },
        };
        // const loginToken = await this.signToken({ id: user.id })
        // return {
        //   httpStatus: HttpStatus.OK, data: {
        //     message: WarningMsg.isUserExist,
        //     isProfileComplete: this.userService.isProfileComplete(user),
        //     accessToken: loginToken,
        //   }
        // };
      }
    } catch (err) {
      console.log(err); //logger
      throw err;
    }
  }

  async validateUser(user): Promise<Boolean> {
    const { phoneNumber, email } = user;
    let check;
    if (email && email !== "") {
      check = [
        { primaryMobileNo: phoneNumber },
        { mobileNumber2: phoneNumber },
        { mobileNumber3: phoneNumber },
        { email: email },
      ];
    } else {
      check = [
        { primaryMobileNo: phoneNumber },
        { mobileNumber2: phoneNumber },
        { mobileNumber3: phoneNumber },
      ];
    }
    console.log("checkkkk--",check)
    const result = await this.userService.findOne({
      where: check,
    });
    if (result) return true;
    else return false;
  }

  async sendVerificationLink(email: String, userId: String) {
    const jwt = await this.authService.generateJWT(
      { id: this.key, userId },
      { secret: process.env.JWT_EMAIL_VERIFICATION_SECRET, expiresIn: "3600s" }
    );
    const { status, message } = await this.sendEmail(email, jwt);
    if (status == "success")
      await this.userService.updateOne(
        { id: userId },
        { emailState: "ValidandNotVerified" }
      );
    else
      await this.userService.updateOne(
        { id: userId },
        { emailState: "Invalid" }
      );
    return message;
  }

  async sendEmail(email: String, token: String) {
    try {
      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "Email Verification link",
        html: `<h3> Please click on given link <h3>
        <p> ${process.env.UI_SERVER_URL}/verify-email?id=${token}<p>`,
      };
      console.log("mailOption----",mailOptions);
      const res = await this.transporter.sendMail(mailOptions);
      console.log("Email res--------",res);
      
      return { message: WarningMsg.emailVerification, status: "success" };
    } catch (e) {
      return { message: WarningMsg.failedEmailVerification, status: "failure" };
    }
  }

  async validateEmailLink(id: String, user) {
    if (this.key == id) {
      await this.userService.updateOne(
        { id: user.id },
        { emailState: "ValidandVerified" }
      );
    } else return false;
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

  async delete(phoneNumber): Promise<any> {
    const result = await this.userService.findOne({
      where: [
        { primaryMobileNo: phoneNumber },
        { mobileNumber2: phoneNumber },
        { mobileNumber3: phoneNumber },
      ],
    });
    if (result && result.id) {
      return await this.userService.deleteUser(result.id);
    }
    return false;
  }
}
