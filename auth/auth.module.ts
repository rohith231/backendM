import { Module, forwardRef } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtEmailVerifyStrategy } from "./jwt-emailverify-strategy";
import { JwtEmailVerifyGuard } from "./guards/jwt-emailverify-guard";
import { JwtAuthStrategy } from "./jwt-authstrategy";
import { JwtAuthGuard } from "./guards/jwt-guard";
import { JwtOtpVerifyStrategy } from "./jwt-otpverify-strategy";
import { JwtOtpAuthGuard } from "./guards/jwt-otp-guard";
import { TwilloModule } from "../twillo/twillo.module";

@Module({
  imports: [JwtModule.register({}), forwardRef(() => TwilloModule)],
  providers: [
    AuthService,
    JwtAuthStrategy,
    JwtAuthGuard,
    JwtOtpVerifyStrategy,
    JwtOtpAuthGuard,
    JwtEmailVerifyStrategy,
    JwtEmailVerifyGuard,
  ],
  exports: [AuthService],
})
export class AuthModule {}
