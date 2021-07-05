import { Entity, Column, OneToOne,OneToMany, ManyToOne, PrimaryGeneratedColumn, PrimaryColumn, JoinColumn } from 'typeorm';
import { Appointment } from './appointment.entity';
import {Provider } from './provider.entity'
import { Clinic } from './clinic.entity';
import { SLOT_STATUS, SLOT_TYPE } from 'src/enum/slot.enum';
import { MasterSlots } from './master-slots.entity';
@Entity()
export class Slots {

    @PrimaryGeneratedColumn()
    id:number

    @Column({type:"enum",enum:SLOT_STATUS})
    status:string;
    default:SLOT_STATUS.FREE;

    @Column({type:'time'})
    start:Date;

    @Column({type:'time'})
    end:Date;

    @Column({type:'date'})
    date: Date;

    @Column()
    overbooked: boolean;
    
    @Column()
    comment:string;

    @Column({type:"enum",enum:SLOT_TYPE})
    slotType:SLOT_TYPE; //

    @ManyToOne(()=> Provider, provider => provider.id)
    provider: Provider;

    @ManyToOne(()=> Clinic, clinic => clinic.id)
    clinic: Clinic;

    @OneToMany(()=> Appointment, appointment => appointment.id,{cascade:false})
    appointments: Appointment[];

    @ManyToOne(()=> MasterSlots, masterSlots => masterSlots.id,{cascade:false})
    masterSlots: MasterSlots;

}