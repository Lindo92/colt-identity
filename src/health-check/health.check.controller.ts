import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { HealthCheckService } from './health-check.service';

@Controller()
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @MessagePattern({ cmd: 'health' })
  async health(): Promise<object> {
    return this.healthCheckService.checkHealth();
  }
}
