import { Entity, Column,  OneToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Provider } from './provider.entity'
import { SLOT_STATUS , SLOT_TYPE} from '../enum/slot.enum';
import { Clinic } from './clinic.entity';
import { Slots } from './slots.entity';
@Entity()
export class MasterSlots{ 

    @PrimaryGeneratedColumn()
    id:number;
    
    @Column({type:"enum",enum:SLOT_STATUS})
    status:string;
    default:SLOT_STATUS.FREE;

    @Column({type:'time'})
    start:Date;

    @Column({type:'time'})
    end:Date;

    @Column({type:"enum",enum:SLOT_TYPE})
    slotType:SLOT_TYPE;

    @ManyToOne(()=> Provider, provider => provider.id)
    provider: Provider;

    @ManyToOne(()=>Clinic, clinic => clinic.id)
    clinic:Clinic;

    @OneToMany(()=> Slots, slots => slots.id,{cascade:false})
    slots: Slots[];
}