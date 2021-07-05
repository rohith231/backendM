import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { SlotsService } from './slots.service';
import { SlotsController } from './slots.controller';
import { Slots } from '../../entities/slots.entity';
import { DatabaseModule } from 'src/database/database.module';
import { CommonModule } from '../../common/common.module';
import moment from "moment-timezone";
export const SlotsProvider = [
  {
    provide: 'SLOTS_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Slots),
    inject: ['DATABASE_CONNECTION'],
  },
];
@Module({
  imports: [ DatabaseModule,CommonModule],
  controllers: [SlotsController],
  providers: [...SlotsProvider,SlotsService],
  exports: [SlotsService]
})
export class SlotsModule {}
