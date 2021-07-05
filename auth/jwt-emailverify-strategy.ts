import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { UnauthorizedException, HttpStatus, Injectable,OnModuleInit } from "@nestjs/common";
import {WarningMsg}from '../warningmsg'
import { UserService } from "../user/user.service";
import { ModuleRef } from "@nestjs/core";
@Injectable()
export class JwtEmailVerifyStrategy extends PassportStrategy (
  Strategy,
  "jwtemailverifyStrategy"
) implements OnModuleInit {
  private userService: UserService;
  constructor(private moduleref: ModuleRef) {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter("id"),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_EMAIL_VERIFICATION_SECRET,
    });
  }
  onModuleInit() {
    this.userService = this.moduleref.get(UserService, { strict: false });
  }
  async validate(payload: any) {
    const user = await this.userService.findById(payload.req.userId);
    if (user) return {user,id:payload.req.id};
    else
      throw new UnauthorizedException(
        HttpStatus.FORBIDDEN,
        WarningMsg.accountNotRegisterd
      );
  }
}
