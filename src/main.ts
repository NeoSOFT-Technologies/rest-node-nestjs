import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import coreBootstrap from '@app/core/bootstrap';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './swagger';
import { setupAPIVersioning } from './core/api.versioning';
import { redisConnection } from './core/middleware/cache.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const PORT = config.get('app.port');

  // If the environment is dev/local/staging, then only swagger will be enabled
  const envList = ['dev', 'staging', 'local', 'test'];

  if (envList.includes(config.get('app.env'))) {
    setupAPIVersioning(app);
    setupSwagger(app);
    // redisConnection(app);
  }
  if (config.get('app.applyCaching')) {
    redisConnection(app);
  }

  // core bootstrap
  // config, environment, pipe, guards, intereceptors
  coreBootstrap(app);

  await app.listen(PORT, () => {
    console.log(`Listening on ::${PORT}`);
  });
}
bootstrap();
