import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '@app/app.module';
import coreBootstrap from '@app/core/bootstrap';
import { setupSwagger } from '@app/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const PORT = config.get('app.port');

  // If the environment is dev/local/staging, then only swagger will be enabled
  const envList = ['dev', 'staging', 'local', 'test'];

  if (envList.includes(config.get('app.env'))) {
    setupSwagger(app);
  }

  // core bootstrap
  // config, environment, pipe, guards, intereceptors
  coreBootstrap(app);

  await app.listen(PORT, () => {
    console.log(`Listening on ::${PORT}`);
  });
}
bootstrap();
