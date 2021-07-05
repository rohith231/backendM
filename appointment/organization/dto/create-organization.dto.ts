import { isEmpty, IsString, IsNotEmpty, isNotEmpty, IsNumber, IsBoolean, IsEnum} from 'class-validator';
import ContactPoint from 'src/entities/interfaces/contact-point';
import { orgType } from '../../../enum/organization.enum';
export class CreateOrganizationDto {
    @IsString()
    name:string;

    @IsString()
    type:orgType;
}
