import {
  HealthCheckError,
  HealthCheckResult,
  HealthCheckService as TerminusHealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { HealthCheckService } from './health-check.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('HealthCheckService', () => {
  let healthCheckService: HealthCheckService;
  let terminusHealthCheckService: TerminusHealthCheckService;
  let db: TypeOrmHealthIndicator;
  const mockTypeOrmHealthIndicator = {
    pingCheck: jest.fn().mockImplementation(() => Promise.resolve()),
  };
  const mockTerminusHealthCheckService = {
    check: jest.fn().mockImplementation(() => Promise.resolve()),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
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

    healthCheckService = app.get<HealthCheckService>(HealthCheckService);
    terminusHealthCheckService = app.get<TerminusHealthCheckService>(
      TerminusHealthCheckService,
    );
    db = app.get<TypeOrmHealthIndicator>(TypeOrmHealthIndicator);
  });

  describe('checkHealth', () => {
    const mockHealthCheckResult: HealthCheckResult = {
      status: 'ok',
      details: {
        database: {
          status: 'up',
        },
        cache: {
          status: 'up',
        },
        storage: {
          status: 'down',
        },
      },
    };

    const mockHealthIndicatorResult = {};

    it('should return health check result', async () => {
      const result = {
        uptime: expect.any(String), // Update to expect any string
        memoryUsage: expect.any(Object), // Update to expect any object
        cpuUsage: expect.any(Object), // Update to expect any object
        isDatabaseHealthy: true,
      };

      jest
        .spyOn(terminusHealthCheckService, 'check')
        .mockImplementation(() => Promise.resolve(mockHealthCheckResult));
      jest
        .spyOn(db, 'pingCheck')
        .mockImplementation(() => Promise.resolve(mockHealthIndicatorResult));

      const healthResult = await healthCheckService.checkHealth();

      expect(healthResult.uptime).toEqual(expect.any(String)); // Update to expect any string
      expect(healthResult.memoryUsage).toEqual(expect.any(Object)); // Update to expect any object
      expect(healthResult.cpuUsage).toEqual(expect.any(Object)); // Update to expect any object
      expect(healthResult.isDatabaseHealthy).toBe(true);
    });

    it('should return false for database health when a HealthCheckError occurs', async () => {
      jest
        .spyOn(terminusHealthCheckService, 'check')
        .mockImplementation(() =>
          Promise.reject(new HealthCheckError('Error', [])),
        );
      jest
        .spyOn(db, 'pingCheck')
        .mockImplementation(() => Promise.resolve(mockHealthIndicatorResult));

      const healthResult = await healthCheckService.checkHealth();

      expect(healthResult.uptime).toMatch(/\d+ seconds/); // Use toMatch with regex pattern
      expect(healthResult.memoryUsage).toEqual(expect.any(Object));
      expect(healthResult.cpuUsage).toEqual(expect.any(Object));
      expect(healthResult.isDatabaseHealthy).toBe(false);
    });
  });
});
