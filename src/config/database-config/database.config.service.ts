import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * The DatabaseConfigService provides access to the database configuration options.
 */
@Injectable()
export class DatabaseConfigService {
  constructor(private configService: ConfigService) {}

  /**
   * Returns the value of the "host" configuration option.
   *
   * @returns the value of the "host" configuration option
   */
  get host(): string {
    return this.configService.get<string>('database.host');
  }

  /**
   * Returns the value of the "port" configuration option.
   *
   * @returns the value of the "port" configuration option
   */
  get port(): number {
    return this.configService.get<number>('database.port');
  }

  /**
   * Returns the value of the "username" configuration option.
   *
   * @returns the value of the "username" configuration option
   */
  get username(): string {
    return this.configService.get<string>('database.username');
  }

  /**
   * Returns the value of the "password" configuration option.
   *
   * @returns the value of the "password" configuration option
   */
  get password(): string {
    return this.configService.get<string>('database.password');
  }

  /**
   * Returns the value of the "name" configuration option.
   *
   * @returns the value of the "name" configuration option
   */
  get name(): string {
    return this.configService.get<string>('database.name');
  }
}
