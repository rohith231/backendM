import { Injectable } from '@nestjs/common';
import { CreateWaitingQueueDto } from './dto/create-waiting-queue.dto';
import { UpdateWaitingQueueDto } from './dto/update-waiting-queue.dto';

@Injectable()
export class WaitingQueueService {
  create(createWaitingQueueDto: CreateWaitingQueueDto) {
    return 'This action adds a new waitingQueue';
  }

  findAll() {
    return `This action returns all waitingQueue`;
  }

  findOne(id: number) {
    return `This action returns a #${id} waitingQueue`;
  }

  update(id: number, updateWaitingQueueDto: UpdateWaitingQueueDto) {
    return `This action updates a #${id} waitingQueue`;
  }

  remove(id: number) {
    return `This action removes a #${id} waitingQueue`;
  }
}
