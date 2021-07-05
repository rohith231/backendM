import { Controller, Query, Get, Post, Body, Patch, Param, Delete, Res, HttpException, HttpStatus } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { FetchProviderDto } from './dto/fetch-provider.dtp';
import { Response } from 'express';
import * as _ from 'lodash';
import { Req } from '@nestjs/common';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Get('/search',)
  async fetch(@Query() query: FetchProviderDto, @Res() res: Response) {
    console.log("query",query.speciality)
    const provider = await this.providersService.fetchProvider(query.speciality,query.date,query.patient);
    if(!_.isEmpty(provider)){
      res.status(HttpStatus.OK).send(provider);
    }else{
        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: `No Provider found`,
          }, HttpStatus.NOT_FOUND);
      }
  }

  @Post('create')
  async create(@Body() createProviderDto: CreateProviderDto) {
    return await this.providersService.create(createProviderDto);
  }

  @Get('details/:id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const provider = await this.providersService.findOne(+id);
    if(!_.isEmpty(provider)){
      res.status(HttpStatus.OK).send(provider);
    }else{
        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: `No Provider found`,
          }, HttpStatus.NOT_FOUND);
      }
  }

  findAll() {
    return this.providersService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providersService.update(+id, updateProviderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providersService.remove(+id);
  }
}
