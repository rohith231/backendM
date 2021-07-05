import { isEmpty, IsString, IsNotEmpty, isNotEmpty, IsDate, IsNumber, IsBoolean, IsArray} from 'class-validator';
import {TYPES} from '../../../enum/speciality.enum'
export class CreateSpecialityDto {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    type:TYPES;

    @IsBoolean()
    @IsNotEmpty()
    isSpecial:boolean;

    @IsNumber()
    @IsNotEmpty()
    orgId:number;

    @IsNumber()
    @IsNotEmpty()
    clinicId:number;
}
