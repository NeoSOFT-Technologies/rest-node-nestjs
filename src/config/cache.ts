import { registerAs } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

export default registerAs('cache', () => ({
  store: redisStore,
  host: process.env.REDIS_HOST || 'localhost',
  port: +process.env.REDIS_PORT || 6379,
  ttl: +process.env.CACHE_TTL || 10,
}));
