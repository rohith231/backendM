import { isEmpty, IsOptional, IsString, IsNotEmpty, IsDate, IsEnum, IsNumber, IsArray, IsObject } from 'class-validator';
import { STATUS_CODE, APPOINTMENT_TYPE, REASON_CODE } from 'src/enum/appointment.enum';
export class CreateAppointmentDto {

    @IsOptional()
    @IsString()
    readonly status: STATUS_CODE; // proposed | pending | booked | arrived | fulfilled | cancelled | noshow | entered-in-error | checked-in | waitlist

    @IsNotEmpty()
    @IsString()
    readonly appointmentType: APPOINTMENT_TYPE; //In out case In-clinic or Tele-Consultant

    @IsOptional()
    @IsString()
    readonly reasonCode: REASON_CODE; // The coded reason that this appointment is being scheduled. This is more clinical than administrative.(Plaster ulcer	Occipital headache	Pylorospasm	ABO incompatibility reaction	Absent tendon reflex	Hemorrhagic shock	Closed fracture trapezoid	Smallpox vaccine poisoning)

    @IsOptional()
    @IsString()
    readonly reasonReference: string; //Reason the appointment has been scheduled to take place(I think the refrence person any one who referd the person)

    @IsOptional()
    @IsNumber()
    priority: number; // Is this really need in our app we don't have priority anywhere

    @IsOptional()
    @IsString()
    description: string;

    @IsNotEmpty()
    start:Date;

    @IsNotEmpty()
    end: Date;

    @IsNotEmpty()
    date: Date;

    @IsOptional()
    @IsNumber()
    minutesDuration: number; //Number of minutes that the appointment is to take. 

    @IsOptional()
    @IsDate()
    readonly created: Date; //Appointmetn Creation Date

    @IsOptional()
    @IsString()
    comment: string; //patient comment for the providers

    @IsOptional()
    @IsString()
    patientInstruction: string; //If providers want to share the intruction to the patient

    @IsNotEmpty()
    @IsArray()
    participant: []; //Assuming the list of the 3rd party participants will come here

    @IsNotEmpty()
    @IsNumber()
    role: number;

    @IsNotEmpty()
    @IsNumber()
    patient: number;

    @IsNotEmpty()
    @IsNumber()
    provider: number;

    @IsNotEmpty()
    @IsNumber()
    clinic: number;

    @IsNotEmpty()
    @IsNumber()
    speciality: number //The specialty of a practitioner that would be required to perform the service requested in this appointment.

    @IsNotEmpty()
    @IsNumber()
    masterSlots: number;
}