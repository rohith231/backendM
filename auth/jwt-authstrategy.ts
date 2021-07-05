import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import {
  HttpStatus,
  Injectable,
  NotFoundException,
  OnModuleInit,
  UnauthorizedException,
} from "@nestjs/common";
import { UserService } from "../user/user.service";
import { ModuleRef } from "@nestjs/core";
import { WarningMsg } from "../warningmsg";

@Injectable()
export class JwtAuthStrategy
  extends PassportStrategy(Strategy, "jwtauthStrategy")
  implements OnModuleInit
{
  private userService: UserService;
  constructor(private moduleref: ModuleRef) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_AUTH_SECRET
    });
  }

  onModuleInit() {
    this.userService = this.moduleref.get(UserService, { strict: false });
  }

  async validate(payload: any) {
    const user = await this.userService.findById(payload.req.id);
    if (user) return user;
    else
      throw new UnauthorizedException(
        HttpStatus.FORBIDDEN,
        WarningMsg.accountNotRegisterd
      );
  }
}
