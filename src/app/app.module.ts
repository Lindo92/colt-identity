import { Module } from '@nestjs/common';
import { HealthCheckModule } from 'src/health-check/health.check.module';

@Module({ imports: [HealthCheckModule] })
export class AppModule {}
