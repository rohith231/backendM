import { PartialType } from '@nestjs/mapped-types';
import { CreateWaitingQueueDto } from './create-waiting-queue.dto';

export class UpdateWaitingQueueDto extends PartialType(CreateWaitingQueueDto) {}
