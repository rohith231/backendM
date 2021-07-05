import { Module } from "@nestjs/common";
import { TrydiffwayService } from "./trydiffway.service";
import { TrydiffwayController } from "./trydiffway.controller";
import { AuthModule } from "../../auth/auth.module";
import { TwilloModule } from "../../twillo/twillo.module";

@Module({
  imports: [AuthModule, TwilloModule],
  providers: [TrydiffwayService],
  controllers: [TrydiffwayController],
})
export class TrydiffwayModule {}
