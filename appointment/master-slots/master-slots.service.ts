import { Injectable,Inject,forwardRef } from '@nestjs/common';
import { CreateMasterSlotDto } from './dto/create-master-slot.dto';
import { UpdateMasterSlotDto } from './dto/update-master-slot.dto';
import { MasterSlots } from '../../entities/master-slots.entity';
import { Provider} from '../../entities/provider.entity';
import { Repository} from 'typeorm'
import {getRepository} from "typeorm";
import * as _ from 'lodash';
import { response } from 'express';
import { Clinic } from 'src/entities/clinic.entity';
@Injectable()
export class MasterSlotsService {
  constructor(
    @Inject('MASTER_SLOTS_REPOSITORY')
    private masterSlotsRepository: Repository<MasterSlots>
    ){}
  async create(createMasterSlotDto:CreateMasterSlotDto):Promise<any> { 
    try{
      let slots = createMasterSlotDto.slots;
       let response = [];
       await Promise.all(
        slots.map(async (value) => {
        const masterSlot = new MasterSlots();
        const provider = new Provider();
        const clinic = new Clinic();
        provider.id = createMasterSlotDto.provider;
        clinic.id = createMasterSlotDto.clinic;

        masterSlot.provider = provider;
        masterSlot.clinic = clinic;
        masterSlot.start = value.start;
        masterSlot.end = value.end;
        masterSlot.slotType = value.slotType; 
        masterSlot.status = value.status;   
        const checkExistOrNot = await this.masterSlotsRepository.find({ where: {provider: createMasterSlotDto.provider,clinic:createMasterSlotDto.clinic}})
        if(_.isEmpty(checkExistOrNot)){
           const newSlot = await this.masterSlotsRepository.save(masterSlot);
           response.push(newSlot);
        }
      })
    );
    return response;
    }catch(err){
      console.log(err);
    }
  }

  async fetchAllMasterSlots(ids: number[]): Promise<any>{
    try{
    const masterslots = await this.masterSlotsRepository.createQueryBuilder("masterslots")
    .select([
      `masterslots.id as id`,
      `masterslots.providerId as providerId`,
      `masterslots.start as start`,
      `masterslots.end as end`,
      `masterslots.status as status`,
      `masterslots.clinicId as clinicId`,
    ])
    .where("masterslots.providerId IN (:...providerId)", { providerId: ids })
    .andWhere("masterslots.slotType = :slotType",{slotType:"open"})
    .andWhere("masterslots.status = :status",{status:"free"})
    .orderBy("masterslots.id")
    .getRawMany();
    return masterslots;  
  }catch(err){
    console.log(err);
  }
}

  findAll() {
    return `This action returns all masterSlots`;
  }

  findOne(id: number) {
    return `This action returns a #${id} masterSlot`;
  }

  update(id: number, updateMasterSlotDto: UpdateMasterSlotDto) {
    return `This action updates a #${id} masterSlot`;
  }

  remove(id: number) {
    return `This action removes a #${id} masterSlot`;
  }
}
