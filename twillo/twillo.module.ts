import { Module, forwardRef } from "@nestjs/common";
import { TwilloService } from "./twillo.service";

@Module({
  imports: [],
  providers: [TwilloService],
  exports: [TwilloService],
})
export class TwilloModule {}
