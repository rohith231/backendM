import { Module } from "@nestjs/common";
import { SignupController } from "./signup.controller";
import { SignupService } from "./signup.service";
import { AuthModule } from "../../auth/auth.module";
import { TwilloModule } from "../../twillo/twillo.module";

@Module({
  imports: [AuthModule, TwilloModule],
  controllers: [SignupController],
  providers: [SignupService],
})
export class SignupModule {}
