import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@app/app.module';
import coreBootstrap from '@app/core/bootstrap';
import { redisConnection } from '@app/core/middleware/cache.middleware';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    coreBootstrap(app);
    // redisConnection(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should return an hello world string along with status', async () => {
    const { body }: any = await request(app.getHttpServer()).get('').expect(200);
    expect(body.data).toEqual('Hello World!');
  });
});
