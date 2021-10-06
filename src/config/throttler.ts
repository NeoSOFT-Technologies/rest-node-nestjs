import { registerAs } from '@nestjs/config';

export default registerAs('throttler', () => ({
  ttl: +process.env.THROTTLE_TTL || 60,
  limit: +process.env.THROTTLE_LIMIT || 10,
}));
