import { Connection, Repository } from 'typeorm';
import { Payment } from '../entities/payment.entity';

export const PaymentProvider = [
  {
    provide: 'PAYMENT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Payment),
    inject: ['DATABASE_CONNECTION'],
  },
];