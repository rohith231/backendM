import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { MomentService } from './moment/moment.service';

@Module({
  controllers: [CommonController],
  providers: [CommonService,MomentService],
  exports: [MomentService]
})
export class CommonModule {}
