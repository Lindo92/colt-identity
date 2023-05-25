import { registerAs } from '@nestjs/config';

/**
 * Exports a default configuration object for the "database" configuration namespace.
 * The configuration object is populated with values from the environment variables.
 *
 * @returns the default configuration object for the "database" namespace
 */
export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  name: process.env.DATABASE_NAME,
}));
