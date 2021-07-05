import { isEmpty, IsString, IsNotEmpty, isNotEmpty, IsDate, IsEnum, IsNumber, IsArray} from 'class-validator';
import { SLOT_STATUS , SLOT_TYPE} from '../../../enum/slot.enum';
export class CreateMasterSlotDto {
    @IsNumber()
    provider: number;    

    @IsNumber()
    clinic: number;

    readonly slots:SlotDto[];

}

export class SlotDto {
    @IsDate()
    readonly start:Date;

    @IsDate()
    readonly end:Date;

    @IsString()
    @IsNotEmpty()
    readonly status: string;

    @IsString()
    slotType:SLOT_TYPE;
}