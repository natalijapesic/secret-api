import { Options } from '@mikro-orm/postgresql';
import { Logger } from '@nestjs/common';
import { Exam, User } from 'core/entities';
import dotenv, { DotenvConfigOutput } from 'dotenv';

const dotenvConfig: DotenvConfigOutput = dotenv.config();
if (dotenvConfig.error) {
  throw dotenvConfig.error;
}

const config: Options = {
  entities: [User, Exam],
  dbName: 'secret-exam',
  host: 'localhost',
  type: 'postgresql',
  port: 5432,
  name: 'postgres',
  password: 'Albis123',
  debug: ['query', 'discovery', 'info'],
  verbose: true,
};

export default config;
