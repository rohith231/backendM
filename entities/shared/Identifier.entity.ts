
import { Entity, Column, PrimaryGeneratedColumn,ManyToOne } from 'typeorm';
import { CodeableConcept } from '../interfaces/codable-concept';

@Entity()
export class Identifier {
  
    @PrimaryGeneratedColumn()
    id :number;
    // @Column()
    // use : IdCode;           // usual | official | temp | secondary | old (If known)
    // @Column()
    // type : string; // Description of identifier
    // @Column()
    // system : string;        // The namespace for the identifier value
    // @Column()
    // value : string;         // The value that is unique
    // @Column({type:"json"})
    // period : { start:Date,end:Date };   // Time period when id is/was valid for use
    // @Column({type:"json"})
    // assigner : string            // Organization that issued id (may be just text)
  }


  export enum IdCode{
    usual,
    official,
    temp,
    secondary,
    old
  }