import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import coreBootstrap from '@app/core/bootstrap';
import { ThrottleModule } from '../../src/core/rate limiter/throttle.module';
import * as request from 'supertest';

describe('Testing api rate limit', () => {
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
  it('Throttle should be defined', async () => {
    expect(ThrottleModule).toBeDefined();
  });

  it('Checking limited response message', async () => {
    await request(app.getHttpServer()).get('/');
    await request(app.getHttpServer()).get('/');
    const response = await request(app.getHttpServer()).get('/');
    expect(response.body.statusCode).toEqual(429);
    expect(response.body.message).toEqual('ThrottlerException: Too Many Requests');
  });
});
