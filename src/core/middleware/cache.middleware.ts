import { Request, Response } from '@app/core';
import { NextFunction } from 'express-serve-static-core';
import * as cacheManager from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';

let manager;
const redisConnection = (app: INestApplication) => {
  const config = app.get(ConfigService);

  manager = cacheManager.caching({
    store: config.get('cache.store'),
    host: config.get('cache.host'),
    port: config.get('cache.rport'),
    ttl: config.get('cache.ttl'),
  });
};

let cacheKey: string;
async function CacheMiddleware(req: Request, res: Response, next: NextFunction) {
  cacheKey = req.method + ' ' + req.url; //string
  const data = await manager.get(cacheKey);
  if (data) {
    res.status(200).json(data);
  } else {
    next();
  }
}
export { manager, cacheKey, CacheMiddleware, redisConnection };
