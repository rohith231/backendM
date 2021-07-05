import { isEmpty, IsString, IsNotEmpty, isNotEmpty, IsNumber, IsBoolean, IsEnum} from 'class-validator';
import ContactPoint from 'src/entities/interfaces/contact-point';
export class CreateClinicDto {
    @IsString()
    name:string;

    @IsNumber()
    telecome:ContactPoint;
}
