import { User } from './modules/users/entities/user.entity';
import * as dotenv from 'dotenv';
dotenv.config();

const environment = process.env.NODE_ENV || 'development';

export const dbConfig: any = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User],
  synchronize: environment === 'development' ? true : false,
};
