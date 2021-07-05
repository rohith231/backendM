import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Payment } from '../entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAYMENT_REPOSITORY')
    private paymentRepository: Repository<Payment>,
  ) {}

  async create(data):Promise<Payment[]>{
    return this.paymentRepository.save(data);
  }
  async findAll(): Promise<Payment[]> {
    return this.paymentRepository.find();
  }
}