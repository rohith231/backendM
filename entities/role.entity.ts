import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Appointment } from './appointment.entity';
import { Patient } from './patient.entity';
import { Provider } from './provider.entity'
import {  ROLE_TYPE } from '../enum/role.enum'


@Entity()
export class Role {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mobileNumber: number;  

  @Column({
      type: "enum",
      enum: ROLE_TYPE
  })
  role: ROLE_TYPE

  @OneToMany(() => Patient, patient => patient.id,{cascade:false})
  patients: Patient[];

  @OneToMany(() => Appointment, appointment => appointment.id,{cascade:false})
  appointments: Appointment[];

  @OneToMany(() => Provider, provider => provider.id,{cascade: false})
  providers: Provider[];
}