import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WaitingQueueService } from './waiting-queue.service';
import { CreateWaitingQueueDto } from './dto/create-waiting-queue.dto';
import { UpdateWaitingQueueDto } from './dto/update-waiting-queue.dto';

@Controller('waiting-queue')
export class WaitingQueueController {
  constructor(private readonly waitingQueueService: WaitingQueueService) {}

  @Post()
  create(@Body() createWaitingQueueDto: CreateWaitingQueueDto) {
    return this.waitingQueueService.create(createWaitingQueueDto);
  }

  @Get()
  findAll() {
    return this.waitingQueueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.waitingQueueService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWaitingQueueDto: UpdateWaitingQueueDto) {
    return this.waitingQueueService.update(+id, updateWaitingQueueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.waitingQueueService.remove(+id);
  }
}
