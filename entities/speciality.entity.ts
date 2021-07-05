import { Entity, Column, OneToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { Organization } from './organization.entity';
import { Appointment } from './appointment.entity';
import { Provider } from './provider.entity';
import {TYPES} from '../enum/speciality.enum'
import { Clinic } from './clinic.entity';
@Entity()
export class Speciality{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    slug:string;

    @Column({type:"enum",enum:TYPES})
    type:string;
    Default:TYPES.BEHAVIOR

    @Column()
    isSpecial:boolean;
    default:false;

    @ManyToOne(()=>Clinic, clinic => clinic.id)
    clinic:Clinic;

    @ManyToOne(()=>Organization, org => org.id)
    org:Organization;
    
    @OneToMany(()=> Appointment, appointment => appointment.id,{cascade:false})
    appointment: Appointment[];

    @OneToMany(()=> Provider, provider => provider.id,{cascade:false})
    provider: Provider;
}