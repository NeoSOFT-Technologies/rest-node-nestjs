import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import coreBootstrap from '@app/core/bootstrap';
import { ThrottleModule } from '../../src/core/rate limiter/throttle.module';
import * as request from 'supertest';
import { ConfigService } from '@nestjs/config';
import { redisConnection } from '../../src/core/middleware/cache.middleware';

describe('Testing api rate limit', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    const config = app.get(ConfigService);
    if (config.get('app.applyCaching')) {
      redisConnection(app);
    }
    coreBootstrap(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });
  it('Throttle should be defined', async () => {
    expect(ThrottleModule).toBeDefined();
  });

  it('Checking limited response message', async () => {
    const config = app.get(ConfigService);
    const limit = config.get('throttler.limit');
    for (let index = 0; index < limit; index++) {
      await request(app.getHttpServer()).get('/');
    }
    const response = await request(app.getHttpServer()).get('/');
    expect(response.body.statusCode).toEqual(429);
    expect(response.body.message).toEqual('ThrottlerException: Too Many Requests');
  });
});
