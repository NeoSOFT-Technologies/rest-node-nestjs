import { INestApplication } from '@nestjs/common';
import { RequestGuard } from './guards';
/**
 * Core bootstrap module should be loaded here.
 * @param app
 *
 */
export default async function bootstrap(app: INestApplication) {
  // guards
  app.useGlobalGuards(new RequestGuard());
}
