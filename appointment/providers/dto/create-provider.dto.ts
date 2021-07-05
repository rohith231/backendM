import { isEmpty, IsString, IsNotEmpty, isNotEmpty, IsNumber, IsBoolean, IsEnum} from 'class-validator';
import ContactPoint from 'src/entities/interfaces/contact-point';
import HumanName from 'src/entities/interfaces/human-name';
import { Gender } from '../../../enum/common.enum';
export class CreateProviderDto {
    @IsBoolean()
    active:boolean;

    @IsString()
    @IsNotEmpty()
    gender:Gender;

    @IsString()
    birthDate:Date;

    @IsBoolean()
    deceased:boolean;

    readonly name:HumanName;

    @IsNumber()
    telecome:ContactPoint;

    @IsNumber()
    roleId:number;

    @IsNumber()
    clinicId: number;

    @IsNumber()
    specialityId:number;
}
