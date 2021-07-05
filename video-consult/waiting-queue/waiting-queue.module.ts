import { Module } from '@nestjs/common';
import { WaitingQueueService } from './waiting-queue.service';
import { WaitingQueueController } from './waiting-queue.controller';

@Module({
  controllers: [WaitingQueueController],
  providers: [WaitingQueueService]
})
export class WaitingQueueModule {}
