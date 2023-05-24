import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from './health.check.controller';
import { HealthCheckService } from './health-check.service';
import {
  TypeOrmHealthIndicator,
  HealthCheckService as TerminusHealthCheckService,
} from '@nestjs/terminus';

describe('HealthCheckController', () => {
  let healthCheckController: HealthCheckController;
  let healthCheckService: HealthCheckService;
  const mockTypeOrmHealthIndicator = {
    pingCheck: jest.fn().mockImplementation(() => Promise.resolve()),
  };
  const mockTerminusHealthCheckService = {
    check: jest.fn().mockImplementation(() => Promise.resolve()),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [
        HealthCheckService,
        {
          provide: TypeOrmHealthIndicator,
          useValue: mockTypeOrmHealthIndicator,
        },
        {
          provide: TerminusHealthCheckService,
          useValue: mockTerminusHealthCheckService,
        },
      ],
    }).compile();

    healthCheckController = app.get<HealthCheckController>(
      HealthCheckController,
    );
    healthCheckService = app.get<HealthCheckService>(HealthCheckService);
  });

  describe('health', () => {
    it('should return the health check results', async () => {
      const result = {
        uptime: expect.any(String), // Update to expect any string
        memoryUsage: expect.any(Object), // Update to expect any object
        cpuUsage: expect.any(Object), // Update to expect any object
        isDatabaseHealthy: true,
      };
      jest
        .spyOn(healthCheckService, 'checkHealth')
        .mockImplementation(() => Promise.resolve(result));

      expect(await healthCheckController.health()).toBe(result);
    });
  });
});
