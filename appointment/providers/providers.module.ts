import { forwardRef,Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { Provider } from '../../entities/provider.entity';
import { DatabaseModule } from 'src/database/database.module';
import { SlotsModule } from '../slots/slots.module';
import { MasterSlotsModule } from '../master-slots/master-slots.module';
import { AppointmentModule } from '../appointment.module';
import { CommonModule } from '../../common/common.module';
export const ProvidersProvider = [
  {
    provide: 'PROVIDER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Provider),
    inject: ['DATABASE_CONNECTION'],
  },
];
@Module({
  imports:[DatabaseModule,SlotsModule,CommonModule,forwardRef(() => MasterSlotsModule),forwardRef(() => AppointmentModule)],
  controllers: [ProvidersController],
  providers: [...ProvidersProvider,ProvidersService],
  exports: [ProvidersService]
})
export class ProvidersModule {}
