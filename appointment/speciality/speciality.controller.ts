import { Controller, Query, Get, Post, Body, Patch, Param, Delete, Res,Req, HttpException, HttpStatus } from '@nestjs/common';
import { SpecialityService } from './speciality.service';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { Response,Request } from 'express';
import * as _ from 'lodash';
import { specialityMessage } from '../../utilities/responseMessage'
@Controller('speciality')
export class SpecialityController {
  constructor(private readonly specialityService: SpecialityService) {}

  @Post('create')
  create(@Body() createSpecialityDto: CreateSpecialityDto) {
    return this.specialityService.create(createSpecialityDto);
  }

  @Get('getAllSpeciality')
  async findAll(@Req() req:Request, @Res() res: Response) {
    try{
      const specialities =  await this.specialityService.findAllSpeciality(req.query);
      if(!_.isEmpty(specialities)){
        res.status(HttpStatus.OK).send(specialities);
      }else{
          throw new HttpException({
              status: HttpStatus.NOT_FOUND,
              error: specialityMessage.specialityNotFound,
            }, HttpStatus.NOT_FOUND);
        }
    }catch(err){
      res.status(HttpStatus.FORBIDDEN).send(err);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specialityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpecialityDto: UpdateSpecialityDto) {
    return this.specialityService.update(+id, updateSpecialityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specialityService.remove(+id);
  }
}
