import { Module } from '@nestjs/common';
import { VideoConsultController } from './video-consult.controller';
import { VideoConsultService } from './video-consult.service';
import { TwilloModule } from '../twillo/twillo.module';
import { WaitingQueueModule } from './waiting-queue/waiting-queue.module';

@Module({
  imports: [TwilloModule, WaitingQueueModule],
  controllers: [VideoConsultController],
  providers: [VideoConsultService],
  exports:[VideoConsultService]
})
export class VideoConsultModule {}
