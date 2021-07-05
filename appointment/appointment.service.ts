import { Injectable,Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';
import { ModuleRef } from '@nestjs/core';
import { SlotsService } from './slots/slots.service';
import { Speciality } from 'src/entities/speciality.entity';
import { Clinic } from 'src/entities/clinic.entity';
import { Role } from 'src/entities/role.entity';
import { Patient } from 'src/entities/patient.entity';
import { Provider } from 'src/entities/provider.entity';
import * as _ from 'lodash';
import { Slots } from 'src/entities/slots.entity';
import { SLOT_TYPE } from 'src/enum/slot.enum';
import {MasterSlots} from 'src/entities/master-slots.entity'
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { STATUS_CODE, APPOINTMENT_TYPE, REASON_CODE } from 'src/enum/appointment.enum';
import { VideoConsultService } from 'src/video-consult/video-consult.service';
@Injectable()
export class AppointmentService {
  constructor(
    private moduleref: ModuleRef,
    @Inject('APPOINTMENT_REPOSITORY')
    private appointmentRepository: Repository<Appointment>,
    private slotsService:SlotsService,
    private videoConsultService: VideoConsultService
  ) {}

  async create(createAppointmentDto:CreateAppointmentDto): Promise<any> {
    try{
      let slotAvailability = await this.slotsService.checkSlotAvailability(createAppointmentDto);
      if(!_.isEmpty(slotAvailability) && slotAvailability.status != 'free')
      {
        return {status:false,message:"This Appointment slot is already booked"};
      }
      if((!_.isEmpty(slotAvailability) && slotAvailability.status == 'free') || _.isNil(slotAvailability)){
        console.log("I am Book Appointment window.")
        /* Book Slots for current Date */
        const createSlot = {
          status : 'busy',
          start : createAppointmentDto.start,
          end : createAppointmentDto.end,
          date : createAppointmentDto.date,
          overbooked : false,
          comment : "",
          slotType : SLOT_TYPE.OPEN,
          providerId : createAppointmentDto.provider,
          clinicId : createAppointmentDto.clinic,
          masterSlotsId : createAppointmentDto.masterSlots
        };
        const slotsBooked = await this.slotsService.create(createSlot);
        if(!_.isEmpty(slotsBooked) && slotsBooked.id){
          /** Book Appointment */
          const role = new Role();
          const clinic = new Clinic();
          const patient = new Patient();
          const provider = new Provider();
          const slots = new Slots();
          const speciality = new Speciality();
          const appointment = new Appointment();
          
          clinic.id = createAppointmentDto.clinic;
          role.id = createAppointmentDto.role;
          patient.id = createAppointmentDto.patient;
          provider.id = createAppointmentDto.provider;
          speciality.id = createAppointmentDto.speciality;
          role.id = createAppointmentDto.role;
          slots.id = slotsBooked.id;          
          appointment.clinic = clinic;
          appointment.patient = patient;
          appointment.provider = provider;
          appointment.speciality = speciality;
          appointment.slots = slots;      
          appointment.role = role;
          appointment.status = (createAppointmentDto.status) ? createAppointmentDto.status : STATUS_CODE.BOOKED;
          appointment.appointmentType = createAppointmentDto.appointmentType;
          appointment.reasonCode = (createAppointmentDto.reasonCode) ? createAppointmentDto.reasonCode : REASON_CODE.CHECKUP;
          appointment.reasonReference = (createAppointmentDto.reasonReference) ? createAppointmentDto.reasonReference : "";
          appointment.priority = (createAppointmentDto.priority) ? createAppointmentDto.priority : 0;
          appointment.description = (createAppointmentDto.description) ? createAppointmentDto.description : "";
          appointment.start = createAppointmentDto.start;
          appointment.end = createAppointmentDto.end;
          appointment.date = createAppointmentDto.date;
          appointment.minutesDuration = (createAppointmentDto.minutesDuration) ? createAppointmentDto.minutesDuration : 15;
          appointment.comment = (createAppointmentDto.comment) ? createAppointmentDto.comment : "";
          appointment.patientInstruction = (createAppointmentDto.patientInstruction) ? createAppointmentDto.patientInstruction : "";
          appointment.participant = createAppointmentDto.participant;
          const booked        = await this.appointmentRepository.save(appointment); 
          const videoLink     = await this.videoConsultService.generateMeetingLink(booked,1);
          return {status:true,message:"Appointment booked!",data:booked};
        }else{
          return {status:false,message:"Unabel to book Appointment"};
        }          
      }else{
        return {status:false,message:"Unabel to book Appointment"};
      }
    }catch(err){
      return err;
    }    
  }

  async update(appointment: Appointment): Promise<any> {
      return await this.appointmentRepository.update(appointment.id, appointment);
  }

  async delete(id): Promise<any> {
      return await this.appointmentRepository.delete(id);
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find();
  }
  
  async findOne(id:number):Promise<any>{
    try{
      return await this.appointmentRepository.findOne({
        where:{id:id},
        relations:['speciality']
      });
    }catch(err){
      console.log(err);
    }
  }

  async checkPreviousAppointment(speciality,patient):Promise<any>{
    try{
      let appointments = await this.appointmentRepository.createQueryBuilder("appointment")
      .select("providerId")
      .where("specialityId = :specialityId",{specialityId:speciality})
      .andWhere("patientId = :patientId",{patientId:patient})
      .getRawMany();
      let providersId = [];
      if(!_.isEmpty(appointments)){
        providersId = _.map(appointments,'providerId');
      }
      return providersId;
    }catch(err){
      console.log(err);
    }
  }

}
