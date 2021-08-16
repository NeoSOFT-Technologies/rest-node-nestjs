import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import coreBootstrap from '@libs/core/bootstrap';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  coreBootstrap(app);

  const config = app.get(ConfigService);
  const PORT = config.get('app.port');

  await app.listen(PORT, () => {
    console.log(`Listening on ::${PORT}`);
  });
}
bootstrap();
