import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import coreBootstrap from '@libs/core/bootstrap';

async function bootstrap() {
  const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
  const app = await NestFactory.create(AppModule);
  coreBootstrap(app);
  await app.listen(PORT, () => {
    console.log(`Listening on ::${PORT}`);
  });
}
bootstrap();
