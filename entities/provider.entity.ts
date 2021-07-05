import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import ContactPoint from './interfaces/contact-point';
import HumanName from './interfaces/human-name';
import {Role} from './role.entity';
import { Slots } from './slots.entity';
import { Clinic } from './clinic.entity';
import { Speciality } from './speciality.entity';
import { MasterSlots } from './master-slots.entity';
import { Gender } from '../enum/common.enum';
import { Appointment } from './appointment.entity';
  
@Entity()
export class Provider {

  @PrimaryGeneratedColumn()
  id:number

  @Column()
  active:boolean;
  default:true;

  @Column({type:'json'})
  name: HumanName[];

  @Column({type:'json'})
  telecome: ContactPoint[]

  @Column({
    type: "enum",
     enum: Gender
  })
   gender:Gender;

  @Column()
  birthDate:Date;

//   @Column()
//   photo: Attachment // Need to create another entity for attachment but first need to figure out how we are storing the images.

  @Column()
  deceased :boolean;

  @Column()
  roomId :string;

  @ManyToOne(()=> Role, role => role.id)
  role: Role;

  @ManyToOne(()=> Clinic, clinic => clinic.id)
  clinic: Clinic;

  @ManyToOne(()=> Speciality, speciality => speciality.id)
  speciality: Speciality;

  @OneToMany(()=> MasterSlots, masterSlots => masterSlots.id,{cascade:false})
  masterSlots: MasterSlots[];

  @OneToMany(()=>Slots,slots=>slots.id,{cascade:false})
  slots: Slots[];

  @OneToMany(()=>Appointment, appointment => appointment.id,{cascade:false})
  appointments: Appointment[];

}