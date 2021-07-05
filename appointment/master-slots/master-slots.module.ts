import { forwardRef,Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { MasterSlotsService } from './master-slots.service';
import { MasterSlotsController } from './master-slots.controller';
import { DatabaseModule } from 'src/database/database.module';
import { MasterSlots } from '../../entities/master-slots.entity';
export const MasterSlotsProvider = [
  {
    provide: 'MASTER_SLOTS_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(MasterSlots),
    inject: ['DATABASE_CONNECTION'],
  },
];
@Module({
  imports: [ DatabaseModule],
  controllers: [MasterSlotsController],
  providers: [...MasterSlotsProvider,MasterSlotsService],
  exports: [MasterSlotsService]
})
export class MasterSlotsModule {}
