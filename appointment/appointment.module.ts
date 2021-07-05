import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AppointmentProvider } from './appointment.providers';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { SlotsModule } from './slots/slots.module';
import { SpecialityModule } from './speciality/speciality.module'
import { ProvidersModule } from './providers/providers.module';
import { PatientModule } from './patient/patient.module';
import { MasterSlotsModule } from './master-slots/master-slots.module';
import { ClinicModule } from './clinic/clinic.module';
import { OrganizationModule } from './organization/organization.module';
import { VideoConsultModule } from 'src/video-consult/video-consult.module';
@Module({
  imports:[DatabaseModule,SlotsModule,SpecialityModule, forwardRef(() => ProvidersModule), PatientModule, MasterSlotsModule, ClinicModule, OrganizationModule,VideoConsultModule],
  providers: [...AppointmentProvider,AppointmentService],
  controllers: [AppointmentController],
  exports: [AppointmentService]
})
export class AppointmentModule {}
