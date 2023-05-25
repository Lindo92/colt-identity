import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DatabaseConfigService } from '../database-config/database.config.service';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly databaseConfigService: DatabaseConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.databaseConfigService.host,
      port: this.databaseConfigService.port,
      username: this.databaseConfigService.username,
      password: this.databaseConfigService.password,
      database: this.databaseConfigService.name,
      entities: [],
    };
  }
}
