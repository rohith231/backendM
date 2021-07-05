import { Entity, Column, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn, PrimaryColumn, JoinColumn } from 'typeorm';
import {Role} from './role.entity';
import { Slots} from './slots.entity'
import { Speciality } from './speciality.entity';
import { Patient } from './patient.entity';
import { Clinic } from './clinic.entity';
import { Provider } from './provider.entity';
import {STATUS_CODE,APPOINTMENT_TYPE,REASON_CODE} from '../enum/appointment.enum'


@Entity()
export class Appointment {

  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:"enum",enum:STATUS_CODE})
  status: STATUS_CODE; // proposed | pending | booked | arrived | fulfilled | cancelled | noshow | entered-in-error | checked-in | waitlist
  default:STATUS_CODE.BOOKED;

  @Column({type:"enum",enum:APPOINTMENT_TYPE})
  appointmentType: APPOINTMENT_TYPE; //In out case In-clinic or Tele-Consultant

  @Column({type:"enum",enum:REASON_CODE})
  reasonCode: REASON_CODE; // The coded reason that this appointment is being scheduled. This is more clinical than administrative.(Plaster ulcer	Occipital headache	Pylorospasm	ABO incompatibility reaction	Absent tendon reflex	Hemorrhagic shock	Closed fracture trapezoid	Smallpox vaccine poisoning)

  @Column()
  reasonReference: string; //Reason the appointment has been scheduled to take place(I think the refrence person any one who referd the person)

  @Column()
  priority: number; // Is this really need in our app we don't have priority anywhere

  @Column()
  description: string;
  
  @Column({type: "time"})
  start: Date;

  @Column({type: "time"})
  end: Date;

  @Column({type:'date'})
  date: Date;
  
  @Column()
  minutesDuration: number; //Number of minutes that the appointment is to take. 

  @CreateDateColumn({ name: 'created' })
  created: Date; //Appointmetn Creation Date 

  @Column()
  comment: string; //patient comment for the providers

  @Column()
  patientInstruction: string; //If providers want to share the intruction to the patient

  @Column({type:"json"})
  participant: Object; //Assuming the list of the 3rd party participants will come here

  @ManyToOne(()=> Role, role => role.id)
  role: Role;

  @ManyToOne(()=> Patient, patient => patient.id)
  patient: Patient;

  @ManyToOne(()=> Provider, provider => provider.id)
  provider: Provider;

  @ManyToOne(()=> Clinic, clinic => clinic.id)
  clinic: Clinic;

  @ManyToOne(()=>Speciality,speciality => speciality.id)
  speciality:Speciality //The specialty of a practitioner that would be required to perform the service requested in this appointment.
  
  @ManyToOne(()=>Slots,slots => slots.id)
  slots: Slots;

   // @Column()
  // basedOn: string; //The service request this appointment is allocated to assess (e.g. incoming referral or procedure request).
  
  // @Column({type:"json"})
  // requestedPeriod: Period; //A set of date ranges (potentially including times) that the appointment is preferred to be scheduled within.
  
  // @Column()
  // supportingInformation: string; //Additional information to support the appointment provided when making the appointment.

  // @Column({type:"json"})
  // cancelationReason: CodeableConcept; //

  // @Column({type:"json"})
  // serviceCategory: CodeableConcept; //A broad categorization of the service that is to be performed during this appointment.

  // @Column({type:"json"})
  // serviceType: CodeableConcept; // The specific service that is to be performed during this appointment.

}
