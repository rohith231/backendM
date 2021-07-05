import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
  Res,
  HttpStatus
} from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guards/jwt-guard";
import { TrydiffwayService } from "./trydiffway.service";
import { validateSecurityQesDto } from "../dto/user.dto";
import { Response } from "express";

@Controller()
export class TrydiffwayController {
  constructor(private readonly tryDiffWayService: TrydiffwayService) { }

  @Post("get-details")
  async getDetails(@Body("phoneNumber") phoneNumber,
    @Body("option") option,
    @Res() res: Response) {
    try {
      const response = await this.tryDiffWayService.getDetails(phoneNumber, option);
      res.status(response.httpStatus).json(response.data);
    } catch (err) {
      console.log("err",err)
      res.status(HttpStatus.FORBIDDEN).send(err);
    }
  }
  @UseGuards(JwtAuthGuard)
  @Post("validate-email")
  async validateEmail(@Body("email") email, @Request() req, @Res() res: Response) {
    try {
      const user = req.user;
      const response = await this.tryDiffWayService.validateEmail(email, user);
      res.status(response.httpStatus).json(response.data);
    } catch (err) {
      res.status(HttpStatus.FORBIDDEN).send(err);
    }
  }


  @UseGuards(JwtAuthGuard)
  @Post("validate-security-qes")
  async validateSecurityQes(
    @Body() validateSecurityQesDto: validateSecurityQesDto,
    @Request() req,
    @Res() res: Response
  ) {
    try {
      const user = req.user;
      console.log("User In validate::::",user);
      const response = await this.tryDiffWayService.validateSecurityQestion(
        validateSecurityQesDto,
        user
      );
      res.status(response.httpStatus).json(response.data);
    } catch (err) {
      res.status(HttpStatus.FORBIDDEN).send(err);
    }
  }
}
