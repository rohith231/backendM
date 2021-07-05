import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsEmail,
  IsMobilePhone,
  IsOptional
} from "class-validator";
import { PickType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
export class UserRequstDto {
  @IsString()
  @IsNotEmpty()
  readonly phoneNumber: String;
  @IsString()
  @IsNotEmpty()
  readonly fname: String;

  @IsString()
  @IsNotEmpty()
  readonly lname: String;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  readonly dob: Date;

  @IsString()
  readonly password: String;

  @IsEmail()
  @IsOptional()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly zip: number;

  @IsString()
  @IsNotEmpty()
  readonly address1: String;

  @IsOptional()
  @IsString()
  readonly address2: String;

  @IsString()
  @IsNotEmpty()
  readonly securityQestion1: String;

  @IsString()
  @IsNotEmpty()
  readonly securityAnswer1: String;

  @IsString()
  @IsNotEmpty()
  readonly securityQestion2: String;
  
  @IsString()
  @IsNotEmpty()
  readonly securityAnswer2: String;

  @IsString()
  @IsNotEmpty()
  readonly securityQestion3: String;

  @IsString()
  @IsNotEmpty()
  readonly securityAnswer3: string;
}
export class CreateUserDto extends PickType(UserRequstDto, [
  "phoneNumber",
  "fname",
  "lname",
  "dob",
  "email"
] as const) {}

export class CompleteProfileRequestDto extends PickType(UserRequstDto, [
  "address1",
  "address2",
  "zip",
  "securityQestion1",
  "securityAnswer1",
  "securityQestion2",
  "securityAnswer2",
  "securityQestion3",
  "securityAnswer3",
] as const) {}

export class validateSecurityQesDto extends PickType(UserRequstDto, [
  "securityQestion1",
  "securityAnswer1",
  "securityQestion2",
  "securityAnswer2",
  "securityQestion3",
  "securityAnswer3",
] as const) {}

export class DeleteUserDto {
@IsString()
@IsNotEmpty()
readonly phoneNumber: String;
}
