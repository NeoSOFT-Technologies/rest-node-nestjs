import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { json, urlencoded } from 'express';
import * as helmet from 'helmet';
import { RequestGuard } from './guards';
import * as compression from 'compression';
import { shouldCompress } from './compression/compression';
import * as cors from 'cors';
import { corsOptions } from './cors.config';
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
      //threshold: 1024,
      threshold: 0,
    })
  );

  // CORS configuration
  app.use(cors(corsOptions));

  // Auto-validation
  // We'll start by binding ValidationPipe at the application level, thus ensuring all endpoints are protected from receiving incorrect data.
  app.useGlobalPipes(new ValidationPipe());

  // guards
  const config = app.get(ConfigService);
  app.useGlobalGuards(new RequestGuard(config));
}
