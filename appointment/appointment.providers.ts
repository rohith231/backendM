import { Connection, Repository } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';

export const AppointmentProvider = [
  {
    provide: 'APPOINTMENT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Appointment),
    inject: ['DATABASE_CONNECTION'],
  },
];