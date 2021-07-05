import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  UseFilters,
  Res,
  UsePipes,
  ValidationPipe, HttpStatus
} from "@nestjs/common";
import { Response } from 'express';
import { JwtAuthGuard } from "../../auth/guards/jwt-guard";
import { SigninService } from "./signin.service";
import { HttpExceptionFilter } from "../../http-exception-filter";
import { CompleteProfileRequestDto } from "../dto/user.dto";

@UseFilters(new HttpExceptionFilter())
@Controller()
export class SigninController {
  constructor(private signinService: SigninService) { }

  @Post("login")
  async loginWithEmail(
    @Body("email") email: string,
    @Body("password") password: string
  ) {
    return this.signinService.loginUserWithEmail(email, password);
  }
  @Post("getotp")
  async getotp(
    @Body("phoneNumber") phoneNumber: string,
    @Body("channel") channel: string,
    @Body("type") type: string,
    @Res() res: Response
  ) {
    try {
      const response = await this.signinService.getOtp(phoneNumber, channel, type);
      res.status(response.httpStatus).send(response.data);
    } catch (err) {
      console.log("err",err)
      res.status(HttpStatus.FORBIDDEN).send(err);
    }
  }

  @Post("verifylogin")
  async verifylogin(
    @Body("otp") otp: number,
    @Body("cmmunicationMedium") cmmunicationMedium: string,
    @Res() res: Response
  ) {
    try {
      const response = await this.signinService.loginWithOtp(otp, cmmunicationMedium);
      res.status(response.httpStatus).send(response.data);
    } catch (err) {
      res.status(HttpStatus.FORBIDDEN).send(err);
    }
  }
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post("completeprofile")
  async completeProfile(
    @Body() completeProfileDto: CompleteProfileRequestDto,
    @Request() req
  ) {
    const { user } = req;
    return await this.signinService.completeProfile(completeProfileDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("home")
  async home(@Request() req) {
    return req.user;
  }
}
