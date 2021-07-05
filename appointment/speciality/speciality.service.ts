import { Injectable, Inject } from '@nestjs/common';
import { Repository,In } from 'typeorm';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { Speciality } from '../../entities/speciality.entity';
import { Clinic } from 'src/entities/clinic.entity';
import { Organization } from 'src/entities/organization.entity';
import * as _ from 'lodash';


@Injectable()
export class SpecialityService {
  constructor(
    @Inject('SPECIALITY_REPOSITORY')
    private specialityRepository: Repository<Speciality>,
  ) { }
  async create(createSpecialityDto: CreateSpecialityDto): Promise<any> {
    let slug = (_.lowerCase(createSpecialityDto.name)).replace(/\s/g, '');
    const speciality = new Speciality();
    const org = new Organization();
    const clinic = new Clinic();
    org.id = createSpecialityDto.orgId;
    clinic.id = createSpecialityDto.clinicId;
    speciality.name = createSpecialityDto.name;
    speciality.type = createSpecialityDto.type;
    speciality.isSpecial = createSpecialityDto.isSpecial;
    speciality.slug = slug;
    speciality.org = org;
    speciality.clinic = clinic;
    return this.specialityRepository.save(speciality);
  }

  async findAllSpeciality(req): Promise<any> {
      if(req.clinic){
        return await this.specialityRepository.find({
          where:{clinic: req.clinic}
        });  
      }
      return await this.specialityRepository.find();  
  }

  findOne(id: number): Promise<Speciality> {
    return this.specialityRepository.findOne();
  }

  update(id: number, updateSpecialityDto: UpdateSpecialityDto): Promise<any>{
    return this.specialityRepository.update(id, updateSpecialityDto);
  }

  async remove(id: number): Promise<void> {
    await this.specialityRepository.delete(id);
  }
}
