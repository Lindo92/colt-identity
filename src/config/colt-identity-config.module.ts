import { Module } from '@nestjs/common';
import { DatabaseConfigModule } from './database-config/database.config.module';
import { TypeOrmConfigModule } from './typeorm-config/typeorm.config.module';

@Module({ imports: [DatabaseConfigModule, TypeOrmConfigModule] })
export class ColtIdentityConfigModule {}
