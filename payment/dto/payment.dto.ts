import {
    isEmpty,
    IsString,
    IsNotEmpty,
    isNotEmpty,
    IsDate,
    IsEmail,
    IsObject,
    IsBoolean,
  } from 'class-validator';
  import { PickType } from '@nestjs/mapped-types';
  import { Type } from 'class-transformer';
  export class PaymentDto {
   
    @IsString()
    @IsNotEmpty()
    readonly identifier: string;

    @IsString()
    status:string;
  
    @IsObject()
    request:{};
  
    @IsObject()
    response:{}
  
    @IsObject()
    created:Date;
  
    @IsObject()
    provider:{}  
   
    @IsObject()
    payment:{}

    @IsObject()
    payee:{}

    @IsObject()
    recipient:{}

    @IsObject()
    amount:{}

    @IsObject()
    paymentStatus:{}
  }