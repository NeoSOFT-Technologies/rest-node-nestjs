import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secretKey: process.env.SECRET_JWT_KEY || 'secretKey123456',
}));
