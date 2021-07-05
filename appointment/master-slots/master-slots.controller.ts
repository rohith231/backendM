import { Controller, Get, Post, Body, Patch, Param, Delete,Res, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { MasterSlotsService } from './master-slots.service';
import { CreateMasterSlotDto } from './dto/create-master-slot.dto';
import { UpdateMasterSlotDto } from './dto/update-master-slot.dto';
import * as _ from 'lodash';

@Controller('master-slots')
export class MasterSlotsController {
  constructor(private readonly masterSlotsService: MasterSlotsService) {}

  @Post('create')
  async create(@Body() createMasterSlotDto: CreateMasterSlotDto, @Res() res: Response) {
    try{
      const slotCreated = await this.masterSlotsService.create(createMasterSlotDto);
      if(!_.isEmpty(slotCreated)){
        res.status(HttpStatus.CREATED).send(slotCreated);   
      }else{
        res.status(HttpStatus.CONFLICT).send({
          status: HttpStatus.CONFLICT,
          error: "Master slot already exist",
        });   
      }      
    }catch(err){
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: err,
      }, HttpStatus.FORBIDDEN);
    }
  }

  @Get()
  findAll() {
    return this.masterSlotsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterSlotsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMasterSlotDto: UpdateMasterSlotDto) {
    return this.masterSlotsService.update(+id, updateMasterSlotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterSlotsService.remove(+id);
  }
}
