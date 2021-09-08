import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { json, urlencoded } from 'express';
import * as helmet from 'helmet';
import { RequestGuard } from './guards';
// const compression = require('compression');
import * as compression from 'compression';
import { shouldCompress } from './compression/compression';
/**
 * Core bootstrap module should be loaded here.
 * @param app
 *
 */
export default async function bootstrap(app: INestApplication) {
  // Global Prefix
  // app.setGlobalPrefix('api');

  // middlewares, express specific\
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  app.use(helmet());
  app.use(
    compression({
      filter: shouldCompress,
      threshold: 1024,
    })
  );

  // Auto-validation
  // We'll start by binding ValidationPipe at the application level, thus ensuring all endpoints are protected from receiving incorrect data.
  app.useGlobalPipes(new ValidationPipe());

  // guards
  const config = app.get(ConfigService);
  app.useGlobalGuards(new RequestGuard(config));
}
