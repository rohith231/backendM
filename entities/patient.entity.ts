import { Entity, Column, OneToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import ContactPoint from './interfaces/contact-point';
import HumanName from './interfaces/human-name';
import {Role} from './role.entity';
import { Appointment } from './appointment.entity';
enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTNERS = "others",
  UNKNOWN="unknown"
}


@Entity()
export class Patient {

  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  active:boolean;

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

  @Column()
  deceased :boolean;
  default:false;

  @ManyToOne(()=> Role, role => role.id)
  role: Role;

  @OneToMany(()=>Appointment, appointment => appointment.id,{cascade:false})
  appointments: Appointment[];
}



