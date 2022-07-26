import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import compression from 'compression';
import cors from 'cors';
import { json, urlencoded } from 'express';
import helmet from 'helmet';

import { shouldCompress } from '@app/core/compression/compression';
import { corsOptions } from '@app/core/cors.config';
import { ErrorHandler, RequestHandler, ResponseHandler } from '@app/core/middleware';
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

  // Bind Interceptors
  app.useGlobalInterceptors(new RequestHandler(), new ResponseHandler());

  // Error Handler
  app.useGlobalFilters(new ErrorHandler());
}
