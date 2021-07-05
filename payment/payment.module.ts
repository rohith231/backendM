import { Module,forwardRef } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PaymentProvider } from './payment.providers';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
@Module({
    imports:[DatabaseModule],
    providers:[...PaymentProvider,PaymentService],
    controllers: [PaymentController]
})
export class PaymentModule {}
