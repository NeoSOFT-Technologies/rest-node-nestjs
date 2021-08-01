import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import coreBootstrap from '@libs/core/bootstrap';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  coreBootstrap(app);
  await app.listen(3000);
}
bootstrap();
