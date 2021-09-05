import { registerAs } from '@nestjs/config';

export default registerAs('crypto', () => ({
  secretKey: process.env.SECRET_KEY || 'sTJQgn5E8d8jMY15PhARwDrW4my6bLwE',
  iv: process.env.IV || '0123456789abcdef',
}));
