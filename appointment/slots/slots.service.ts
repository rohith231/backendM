import { Injectable,Inject } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';
import { Slots } from '../../entities/slots.entity';
import { MomentService } from '../../common/moment/moment.service';
import { SLOT_TYPE, SLOT_STATUS } from 'src/enum/slot.enum';
import { MasterSlots } from 'src/entities/master-slots.entity';
import { Clinic } from 'src/entities/clinic.entity';
import { Provider } from 'src/entities/provider.entity';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';

@Injectable()
export class SlotsService {
  constructor(
  @Inject('SLOTS_REPOSITORY')
  private slotsRepository: Repository<Slots>,
  private momentService:MomentService

  ){}

  async create(createSlotDto: CreateSlotDto) {   
    const slots = new Slots();
    const provider = new Provider()
    const clinic = new Clinic();
    const masterSlots = new MasterSlots();
    
    provider.id = createSlotDto.providerId;
    clinic.id = createSlotDto.clinicId;
    masterSlots.id = createSlotDto.masterSlotsId;

    slots.status = 'busy',
    slots.start = createSlotDto.start;
    slots.end = createSlotDto.end;
    slots.date = createSlotDto.date;
    slots.overbooked =false;
    slots.comment ="";
    slots.slotType = SLOT_TYPE.OPEN;
    slots.provider = provider;
    slots.clinic = clinic;
    slots.masterSlots = masterSlots; 
    console.log("slots",slots);    
    return await this.slotsRepository.save(slots);
  }

  findAll(): Promise<Slots[]> {
    return this.slotsRepository.find();
  }

  findOne(id: number): Promise<any> {
    return this.slotsRepository.findOne();
  }

  async update(id: number, updateSlotDto: UpdateSlotDto): Promise<any>{
    return await this.slotsRepository.update(id, updateSlotDto);
  }

  async remove(id: number) : Promise<void> {
    await this.slotsRepository.delete(id);
  }

  async checkSlotAvailability(createAppointmentDto: CreateAppointmentDto): Promise<any>{
    console.log("date",createAppointmentDto.date)
    return await this.slotsRepository.createQueryBuilder("slots")
    .where("slots.masterSlots = :id",{id:createAppointmentDto.masterSlots})
    .andWhere("slots.slotType = :slotType",{slotType:"open"})
    .andWhere("slots.date = :date",{date:createAppointmentDto.date})
    .andWhere("slots.start = :start",{start:createAppointmentDto.start})
    .andWhere("slots.end = :end",{end:createAppointmentDto.end})
    .andWhere("slots.status = :status",{status:SLOT_STATUS.BUSY}).getOne()
  }
  
  async fetchAllSlots(ids: number[],date): Promise<any>{
    date = this.momentService.formateDate(date)
    console.log("date--",date)
    const slots = await this.slotsRepository.createQueryBuilder("slots")
    .select([
      `slots.providerId as providerId`,
      `slots.start as start`,
      `slots.end as end`,
      `slots.masterSlotsId as masterSlotsId`,
      `slots.date as date`,
    ])
    .where("slots.providerId IN (:...providerId)", { providerId: ids })
    .andWhere(`slots.date = '${date}'`)
    .andWhere("slots.slotType = :slotType",{slotType:"open"})
    .andWhere("slots.status = :status",{status:"busy"})
    .orderBy("slots.id")
    .getRawMany();
    return slots;
  }
}
