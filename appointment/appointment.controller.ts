import { Controller, Query, Get, Post, Body, Patch, Param, Delete, Res,  HttpException, HttpStatus } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from '../entities/appointment.entity';
import { Response, Request } from 'express';
import * as _ from 'lodash';
import { Req } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
@Controller('appointment')
export class AppointmentController {
    constructor(private readonly appointmentService : AppointmentService){}

  @Post('book')
  async create(@Body() createAppointmentDto: CreateAppointmentDto, @Res() res: Response) {    
    const bookAppointment  =  await this.appointmentService.create(createAppointmentDto);
    if(!_.isEmpty(bookAppointment) && bookAppointment.status){
      res.status(HttpStatus.CREATED).send(bookAppointment);
    }else if(!_.isEmpty(bookAppointment) && !bookAppointment.status){
      res.status(HttpStatus.NOT_FOUND).send(bookAppointment);
    }else{
        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: `Unable to book Appointment`,
          }, HttpStatus.NOT_FOUND);
      }    
  }

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get('details/:id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const appointment = await this.appointmentService.findOne(+id);
    if(!_.isEmpty(appointment)){
      res.status(HttpStatus.OK).send(appointment);
    }else{
        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: `No appointment found`,
          }, HttpStatus.NOT_FOUND);
      }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: Appointment) {
    updateUserDto.id = Number(id);
    console.log('Update #' + updateUserDto.id)
    return this.appointmentService.update(updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.delete(+id);
  }
}
