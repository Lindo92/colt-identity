import { Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthCheckService as TerminusHealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import * as os from 'os';
import * as process from 'process';

@Injectable()
export class HealthCheckService {
  constructor(
    private readonly health: TerminusHealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
  ) {}

  /**
   * Performs a health check on the system and database.
   *
   * @returns A Promise that resolves to an object containing the health check results.
   */
  async checkHealth(): Promise<{
    uptime: string;
    memoryUsage: NodeJS.MemoryUsage;
    cpuUsage: NodeJS.CpuUsage;
    isDatabaseHealthy: boolean;
  }> {
    const uptime = os.uptime();
    const memoryUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();
    let isDatabaseHealthy = false;

    try {
      await this.health.check([
        async () => this.db.pingCheck('database', { timeout: 3000 }),
      ]);
      isDatabaseHealthy = true;
    } catch (error) {
      if (error instanceof HealthCheckError) {
        isDatabaseHealthy = false;
      } else {
        throw error;
      }
    }

    return {
      uptime: `${uptime} seconds`,
      memoryUsage: memoryUsage,
      cpuUsage: cpuUsage,
      isDatabaseHealthy: isDatabaseHealthy,
    };
  }
}
