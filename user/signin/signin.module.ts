import { Module } from "@nestjs/common";
import { SigninController } from "./signin.controller";
import { SigninService } from "./signin.service";
import { TwilloModule } from "../../twillo/twillo.module";
import { AuthModule } from "../../auth/auth.module";

@Module({
  imports: [AuthModule, TwilloModule],
  controllers: [SigninController],
  providers: [SigninService],
  exports: [SigninService],
})
export class SigninModule {}
