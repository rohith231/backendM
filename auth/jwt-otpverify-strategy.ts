import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { TwilloService } from "../twillo/twillo.service";

@Injectable()
export class JwtOtpVerifyStrategy extends PassportStrategy(
  Strategy,
  "jwtotpverifyStrategy"
) {
  constructor(
    @Inject(forwardRef(() => TwilloService))
    private twilloService: TwilloService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "JWT_OTP_VERIFY_SECRET",
    });
  }

  async validate(payload: any) {
    const attemptSid = { ...payload.req };
    // const twilloSession = await this.twilloService.findWithAttemptSid(
    //   attemptSid,
    // );
    // return twilloSession;
  }
}
