import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  port2: process.env.DB_PORT_2 || 27017,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'rest_api',
}));
