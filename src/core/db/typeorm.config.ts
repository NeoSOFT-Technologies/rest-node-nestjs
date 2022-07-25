import { config } from 'dotenv';
import { ConnectionOptions } from 'typeorm';

import { User } from '@app/feature/users/entities/user.entity';

config({ path: 'config/env/.env' });

const configa: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User],
  synchronize: false,
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};

export = configa;
