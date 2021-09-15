import { Request, Response } from '@app/core';
import { NextFunction } from 'express-serve-static-core';
import * as cacheManager from 'cache-manager';
import * as redisStore from 'cache-manager-redis-store';

const manager = cacheManager.caching({
  store: redisStore,
  host: process.env.REDIS_HOST,
  port: +process.env.REDIS_PORT,
  ttl: 10,
});
let key: any;
async function CacheMiddleware(req: Request, res: Response, next: NextFunction) {
  key = req.url; //string
  const data = await manager.get(key);
  if (data) {
    return res.status(200).json(data);
  } else {
    next();
  }
}
export { manager, key, CacheMiddleware };
