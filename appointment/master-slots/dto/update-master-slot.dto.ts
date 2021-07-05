import { PartialType } from '@nestjs/mapped-types';
import { CreateMasterSlotDto } from './create-master-slot.dto';

export class UpdateMasterSlotDto extends PartialType(CreateMasterSlotDto) {}
