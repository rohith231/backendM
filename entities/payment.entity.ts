import { Entity, Column,  PrimaryGeneratedColumn } from 'typeorm';
import {Money} from './interfaces/money';
import {CodeableConcept} from './interfaces/codable-concept';
import {Reference} from './interfaces/reference.interface';
import {STATUS_CODE} from '../enum/payment.enum';


@Entity('payment')
export class Payment {  
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:"enum",enum:STATUS_CODE})
  status: STATUS_CODE; //active | cancelled | draft | entered-in-error

  @Column({type:"json"})
  request: Reference; //

  @Column({type:"json"})
  response: Reference;

  @Column({ type: 'datetime' })
  created: Date;

  @Column({type:"json"})
  provider: Reference; //Practitioner | PractitionerRole | Organization

  @Column({type:"json"})
  payment:Reference;

  @Column({type:'date'})
  paymentDate:Date;

  @Column({type:"json"})
  payee:Reference; //Practitioner | PractitionerRole | Organization
  //Definition - The party who will receive or has received payment that is the subject of this notification.

  @Column({type:"json"})
  recipient:Reference;  //Organization
  //Definition - The party who is notified of the payment status.

  @Column({type:"json"})
  amount:Money;

  @Column({type:"json"})
  paymentStatus:CodeableConcept;
  //Definition - Typically paid: payment sent, cleared: payment received.



}