import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './database.config';
import { DatabaseConfigService } from './database.config.service';

/**
 * The DatabaseConfigModule provides configuration options related to the database.
 * It uses the ConfigModule from the @nestjs/config package to load and validate
 * the configuration options.
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
      }),
      isGlobal: true,
    }),
  ],
  providers: [DatabaseConfigService],
  exports: [DatabaseConfigModule, DatabaseConfigService],
})
export class DatabaseConfigModule {}
