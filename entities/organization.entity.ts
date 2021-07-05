import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Speciality } from './speciality.entity';
import { orgType } from '../enum/organization.enum';

@Entity()
export class Organization {

  @PrimaryGeneratedColumn()
  id :number;

  @Column()
  active:boolean = true;

  @Column({type:"enum",enum:orgType})
  type:orgType;

  @Column()
  name:string;

  @Column()
  alias:string;

  @OneToMany(()=>Speciality, speciality => speciality.id,{cascade:false})
  specialities:Speciality[];
}