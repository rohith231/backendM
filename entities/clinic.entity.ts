import { Entity, Column, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import ContactPoint from './interfaces/contact-point';
import { Appointment } from './appointment.entity';
import { Provider } from './provider.entity'
import { Slots} from './slots.entity'
import { Speciality } from './speciality.entity';
import { MasterSlots } from './master-slots.entity';

@Entity()
export class Clinic {

  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  name:string;

  @Column({type:'json'})
  telecome: ContactPoint[]

  @OneToMany(()=>Appointment, appointment => appointment.id,{cascade:false})
  appointment: Appointment[];

  @OneToMany(()=>Provider, provider => provider.id,{cascade:false})
  provider: Provider;

  @OneToMany(()=>Slots, slots => slots.id,{cascade:false})
  slots: Slots;

  @OneToMany(()=>Speciality, speciality => speciality.id,{cascade:false})
  speciality: Speciality;

  @OneToMany(()=>MasterSlots, masterSlots => masterSlots.id,{cascade:false})
  masterSlots: MasterSlots;
}