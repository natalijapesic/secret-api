import { Options } from '@mikro-orm/postgresql';
import { Logger } from '@nestjs/common';
import dotenv, { DotenvConfigOutput } from 'dotenv';

const dotenvConfig: DotenvConfigOutput = dotenv.config();
if (dotenvConfig.error) {
  throw dotenvConfig.error;
}

const logger = new Logger('MikroORM');
const config: Options = {
  entities: [Option],
  dbName: 'secret-exam',
  host: 'localhost',
  type: 'postgresql',
  port: 5432,
  name: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  debug: process.env.NODE_ENV === 'development',
  logger: logger.log.bind(logger),
  verbose: true,
};

export default config;
