import { INestApplication, ValidationPipe } from '@nestjs/common';
import { RequestGuard } from './guards';
/**
 * Core bootstrap module should be loaded here.
 * @param app
 *
 */
export default async function bootstrap(app: INestApplication) {
  // Auto-validation
  // We'll start by binding ValidationPipe at the application level, thus ensuring all endpoints are protected from receiving incorrect data.
  app.useGlobalPipes(new ValidationPipe());

  // guards
  app.useGlobalGuards(new RequestGuard());
}
