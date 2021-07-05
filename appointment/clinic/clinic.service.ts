import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { Clinic } from '../../entities/clinic.entity';
@Injectable()
export class ClinicService {
  constructor(
    @Inject('CLINIC_REPOSITORY')
    private clinicRepository: Repository<Clinic>
  ){}
  create(createClinicDto: CreateClinicDto) {
    const clinic = new Clinic();
    clinic.name = createClinicDto.name;
    clinic.telecome = [];
    clinic.telecome["use"] = "work";
    clinic.telecome["value"] = createClinicDto.telecome;
    clinic.telecome = Object.assign({}, clinic.telecome); //convert array to object
    return this.clinicRepository.save(clinic);
  }

  findAll() {
    return `This action returns all clinic`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clinic`;
  }

  update(id: number, updateClinicDto: UpdateClinicDto) {
    return `This action updates a #${id} clinic`;
  }

  remove(id: number) {
    return `This action removes a #${id} clinic`;
  }
}
