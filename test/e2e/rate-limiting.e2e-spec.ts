import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@app/app.module';
import coreBootstrap from '@app/core/bootstrap';
import { ThrottleModule } from '@app/core/rate limiter/throttle.module';
import * as request from 'supertest';
import { ConfigService } from '@nestjs/config';
import { StatusCodes } from 'http-status-codes';

describe('Testing api rate limit', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
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
    expect(response.body.statusCode).toEqual(StatusCodes.TOO_MANY_REQUESTS);
    expect(response.body.message).toEqual('ThrottlerException: Too Many Requests');
  });
});
