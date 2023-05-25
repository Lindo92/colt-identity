import { Module } from '@nestjs/common';
import { TypeOrmConfigService } from './typeorm.config.service';
import { DatabaseConfigModule } from '../database-config/database.config.module';

@Module({
  providers: [TypeOrmConfigService],
  exports: [TypeOrmConfigService],
  imports: [DatabaseConfigModule],
})
export class TypeOrmConfigModule {}
