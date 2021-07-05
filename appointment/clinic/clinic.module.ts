import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { ClinicService } from './clinic.service';
import { ClinicController } from './clinic.controller';
import { Clinic } from '../../entities/clinic.entity';
import { DatabaseModule } from 'src/database/database.module';
export const ClinicProvider = [
  {
    provide: 'CLINIC_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Clinic),
    inject: ['DATABASE_CONNECTION'],
  },
];
@Module({
  imports: [DatabaseModule],
  controllers: [ClinicController],
  providers: [...ClinicProvider,ClinicService],
  exports: [ClinicService]
})
export class ClinicModule {}
