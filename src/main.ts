import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import coreBootstrap from '@app/core/bootstrap';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from '@app/swagger';
import { setupAPIVersioning } from '@app/core/api.versioning';
import * as fs from 'fs';

async function bootstrap() {
  const ssl = process.env.SSL === 'true' ? true : false;
  let httpsOptions = null;
  if (ssl) {
    httpsOptions = {
      key: fs.readFileSync(`${__dirname}/${process.env.SSL_KEY_PATH || ''}`),
      cert: fs.readFileSync(`${__dirname}/${process.env.SSL_CERT_PATH || ''}`),
      passphrase: process.env.SSL_PASS_PHRASE || '',
    };
  }
  const app = await NestFactory.create(AppModule, { httpsOptions });

  const config = app.get(ConfigService);
  const PORT = config.get('app.port');

  // If the environment is dev/local/staging, then only swagger will be enabled
  const envList = ['dev', 'staging', 'local', 'test'];

  if (envList.includes(config.get('app.env'))) {
    setupAPIVersioning(app);
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
