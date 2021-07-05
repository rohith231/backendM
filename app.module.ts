import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TwilloModule } from './twillo/twillo.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { VideoConsultModule } from './video-consult/video-consult.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { PaymentModule } from './payment/payment.module';
import { AppointmentModule } from './appointment/appointment.module';
import { SpecialityModule } from './appointment/speciality/speciality.module';
import { SlotsModule } from './appointment/slots/slots.module';
import { CommonModule } from './common/common.module';
import { MasterSlotsModule } from './appointment/master-slots/master-slots.module';
import { EventsModule } from './events/events.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TwilloModule,
    UserModule,
    AuthModule,
    DatabaseModule,
    PassportModule.register({ session: true }),
    VideoConsultModule,
    DatabaseModule,
    PaymentModule,
    AppointmentModule,
    SpecialityModule,
    SlotsModule,
    CommonModule,
    MasterSlotsModule,
    EventsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
