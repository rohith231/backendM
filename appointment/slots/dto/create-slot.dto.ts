import { isEmpty, IsString, IsNotEmpty, isNotEmpty, IsDate, IsEnum,IsNumber} from 'class-validator';
import { SLOT_TYPE } from 'src/enum/slot.enum';

export class CreateSlotDto{
    @IsString()
    readonly status: string;

    @IsDate()
    readonly start:Date;

    @IsDate()
    readonly end:Date;

    @IsDate()
    readonly date:Date;
    
    readonly overbooked:boolean;
    readonly comment:string;

    @IsString()
    slotType:SLOT_TYPE;

    @IsNumber()
    providerId: number;
  
    @IsNumber()
    clinicId: number;

    @IsNumber()
    masterSlotsId:number;
}
