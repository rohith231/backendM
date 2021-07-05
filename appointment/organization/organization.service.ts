import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Organization } from 'src/entities/organization.entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import * as _ from 'lodash';
@Injectable()
export class OrganizationService {
  constructor(
    @Inject('ORGANIZATION_REPOSITORY')
    private organizationRepository: Repository<Organization>
  ){}
  create(createOrganizationDto: CreateOrganizationDto) {
    const organization = new Organization();
    organization.active = true;
    organization.type = createOrganizationDto.type;
    organization.name = createOrganizationDto.name;
    organization.alias = (_.lowerCase(createOrganizationDto.name)).replace(/\s/g, '');    
    return this.organizationRepository.save(organization);
  }

  findAll() {
    return `This action returns all organization`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organization`;
  }

  update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    return `This action updates a #${id} organization`;
  }

  remove(id: number) {
    return `This action removes a #${id} organization`;
  }
}
