import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  Request,
  UseGuards,
  HttpStatus,
  Query,
  UsePipes,
  ValidationPipe,
  UseFilters,
  BadRequestException,
} from "@nestjs/common";
import { SignupService } from "./signup.service";
import { CreateUserDto,DeleteUserDto } from "../dto/user.dto";
import { HttpExceptionFilter } from "../../http-exception-filter";
import { Response } from "express";
import { JwtEmailVerifyGuard } from "../../auth/guards/jwt-emailverify-guard";
import * as _ from 'lodash';

@UseFilters(new HttpExceptionFilter())
@Controller()
export class SignupController {
  constructor(private signupService: SignupService) { }

  @Post("deleteUser")
  async deleteUser(@Body() deleteUserDto:DeleteUserDto,@Res() res: Response){
    try{
    const response = await this.signupService.delete(deleteUserDto.phoneNumber);
        if(!_.isEmpty(response) && response.affected==1){
          res.status(HttpStatus.OK).json({"message":"Record Deleted Successfully."});
        }else{
          res.status(HttpStatus.NOT_FOUND).json({"message":"No record found"});
        }
    }catch(err){
      throw err;
    }
  }

  @Post("register")
  @UsePipes(new ValidationPipe())
  async registerWithOtp(
    @Body() user: CreateUserDto,
    @Body("otp") otp: number,
    @Res() res: Response
  ) {
    try {
      const response = await this.signupService.createUserWithOtp(user, otp);
      res.status(response.httpStatus).json(response.data);
    } catch (err) {
      res.status(HttpStatus.FORBIDDEN).send(err);
    }

  }

  @UseGuards(JwtEmailVerifyGuard)
  @Get("verify-email")
  async verifyEmail(@Request() req) {
    const { user, id } = req.user;
    const isEmailAlreadyUpdated = this.signupService.validateEmailLink(
      id,
      user,
    );
    return { isEmailAlreadyUpdated };
  }
}
