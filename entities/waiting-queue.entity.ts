import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import ContactPoint from './interfaces/contact-point';
import HumanName from './interfaces/human-name';
import { Gender } from '../enum/common.enum';

@Entity()
export class WatingQueue {
    @PrimaryGeneratedColumn()
    id:number
  
    @Column()
    status:boolean;
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
}