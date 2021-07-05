import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { DatabaseModule } from 'src/database/database.module';
import { Organization } from 'src/entities/organization.entity';
export const OrganizationProvider = [
  {
    provide: 'ORGANIZATION_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Organization),
    inject: ['DATABASE_CONNECTION'],
  },
];
@Module({
  imports: [DatabaseModule],
  controllers: [OrganizationController],
  providers: [...OrganizationProvider,OrganizationService],
  exports: [OrganizationService]
})
export class OrganizationModule {}
