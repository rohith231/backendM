import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { SpecialityService } from './speciality.service';
import { SpecialityController } from './speciality.controller';
import { Speciality } from '../../entities/speciality.entity';
import { DatabaseModule } from 'src/database/database.module';
export const SpecialityProvider = [
  {
    provide: 'SPECIALITY_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Speciality),
    inject: ['DATABASE_CONNECTION'],
  },
];

@Module({
  imports:[DatabaseModule],
  controllers: [SpecialityController],
  providers: [...SpecialityProvider,SpecialityService]
})
export class SpecialityModule {}
