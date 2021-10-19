import { registerAs } from '@nestjs/config';

export default registerAs('mailer', () => ({
  fromEmail: process.env.USER_EMAIL,
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: !!+process.env.SECURE,
  username: process.env.USER_EMAIL,
  password: process.env.USER_PASSWORD,
}));
