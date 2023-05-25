import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColtIdentityConfigModule } from 'src/config/colt-identity-config.module';
import { TypeOrmConfigModule } from 'src/config/typeorm-config/typeorm.config.module';
import { TypeOrmConfigService } from 'src/config/typeorm-config/typeorm.config.service';
import { HealthCheckModule } from 'src/health-check/health.check.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [TypeOrmConfigModule],
      useExisting: TypeOrmConfigService,
    }),
    HealthCheckModule,
    ColtIdentityConfigModule,
  ],
})
export class AppModule {}
