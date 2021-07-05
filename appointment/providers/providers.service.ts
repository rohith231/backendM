import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider } from '../../entities/provider.entity';
import { Role } from '../../entities/role.entity';
import { Clinic } from '../../entities/clinic.entity';
import { Speciality } from '../../entities/speciality.entity';
import { SlotsService } from '../slots/slots.service';
import { MasterSlotsService } from '../master-slots/master-slots.service';
import * as _ from 'lodash';
import { AppointmentService } from '../appointment.service';
import { MomentService } from '../../common/moment/moment.service';
@Injectable()
export class ProvidersService {
  constructor(
    @Inject('PROVIDER_REPOSITORY')
    @Inject(forwardRef(() => MasterSlotsService))
    private providerRepository: Repository<Provider>,
    private slotsService: SlotsService,
    private masterSlotsService: MasterSlotsService,
    private appointmentService: AppointmentService,
    private momentService: MomentService
  ) { }

  async create(createProviderDto: CreateProviderDto): Promise<any> {
    const provider = new Provider();
    provider.name = [];
    provider.name['firstName'] = createProviderDto.name.firstName;
    provider.name['lastName'] = createProviderDto.name.lastName;
    provider.name = Object.assign({}, provider.name);
    provider.deceased = createProviderDto.deceased;
    provider.birthDate = createProviderDto.birthDate;
    provider.gender = createProviderDto.gender;
    provider.telecome = [];
    provider.telecome["use"] = "Home";
    provider.telecome["value"] = createProviderDto.telecome;
    provider.telecome = Object.assign({}, provider.telecome); //convert array to object
    const clinic = new Clinic();
    const role = new Role();
    const speciality = new Speciality();
    role.id = createProviderDto.roleId;
    clinic.id = createProviderDto.clinicId;
    speciality.id = createProviderDto.specialityId;
    provider.role = role;
    provider.clinic = clinic;
    provider.speciality = speciality;
    return await this.providerRepository.save(provider);
  }

  findAll() {
    return `This action returns all providers`;
  }

  async findOne(id: number) {
    return await this.providerRepository.findOne({
      where:{id:id},
      relations: ['speciality'],
    });
  }

  update(id: number, updateProviderDto: UpdateProviderDto) {
    return `This action updates a #${id} provider`;
  }

  remove(id: number) {
    return `This action removes a #${id} provider`;
  }

  async fetchProvider(speciality, date, patient): Promise<any> {

    /* check previous appointments and fetch previous providers */
    const previousProviderIds = await this.appointmentService.checkPreviousAppointment(speciality, patient);
    const query = this.providerRepository.createQueryBuilder("provider")
      .where("provider.specialityId = :specialityId", { specialityId: speciality });
    if (!_.isEmpty(previousProviderIds)) {
      query.andWhere("provider.id IN (:...id)", { id: previousProviderIds }) //Apply only when previous appointment is exist.
    }
    const provider = await query.getMany();
    let providersIds = _.map(provider, 'id');
    if (!_.isEmpty(providersIds)) {
      /**Fetch Booked Slots */
      const slots = await this.slotsService.fetchAllSlots(providersIds, date);
      _.forEach(provider, (value) => {
        let allSlots = _.filter(slots, { providerId: value.id });
        value.slots = (!_.isEmpty(allSlots)) ? allSlots : [];
      });
      /**Fetch Master Slots */
      const masterSlots = await this.masterSlotsService.fetchAllMasterSlots(providersIds);
      /** Fetch Appointment dates */
      let appointmentBookDates = await this.momentService.appointmentDatesArray(date);
      _.forEach(provider, async (value) => {
        let allMasterSlots = _.filter(masterSlots, { providerId: value.id });
        let appointmentSlots;
        let finalSlots = [];
        _.forEach(appointmentBookDates, async (apDate) => {
          appointmentSlots = {};
          appointmentSlots.date = apDate;
          _.forEach(allMasterSlots, async (masterSlot) => {
            masterSlot.isBooked = false;
            if (!_.isEmpty(value.slots)) {
              let bookedSlot = _.find(value.slots, async (slot) => {
                let date = await this.momentService.formateDate(slot.date);
                apDate = await this.momentService.formateDate(apDate);
                if (slot.masterSlotsId == masterSlot.id && date == apDate) {
                  return true;
                }
              });
              masterSlot.isBooked = (bookedSlot.masterSlotsId == masterSlot.id) ? true : false;
            }
          });
          appointmentSlots.masterSlots = allMasterSlots;
          finalSlots.push(appointmentSlots);
        });
        value.slots = finalSlots;
      });
    }
    return provider;
  }
}