import { isEmpty, IsString, IsNotEmpty, isNotEmpty, IsDate} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateSlotDto } from './create-slot.dto';

export class UpdateSlotDto extends PartialType(CreateSlotDto) {
}
