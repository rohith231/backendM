import { Entity, Column, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn, PrimaryColumn, JoinColumn } from 'typeorm';
import {Role} from './role.entity';
import { Slots} from './slots.entity'
import { Speciality } from './speciality.entity';
import { Patient } from './patient.entity';
import { Clinic } from './clinic.entity';
import { Provider } from './provider.entity';
import {STATUS_CODE,APPOINTMENT_TYPE,REASON_CODE} from '../enum/appointment.enum'
import { IsNumber } from 'class-validator';
import ContactPoint from './interfaces/contact-point';

@Entity()
export class AppointmentForm {

  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  intrected_with_dr: string;

  @Column()
  parent_name: string;

  @Column()
  marital_status: string;

  @Column()
  patient_first_name: string;

  @Column()
  patient_last_name: string;

  @Column()
  dob: string;

  @Column()
  gender: string;

  @Column()
  cellphone: string;

  @Column()
  email: string;
}