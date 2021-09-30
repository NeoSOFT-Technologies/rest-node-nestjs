import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { CacheMiddleware, manager, redisConnection } from '../../src/core/middleware/cache.middleware';
import coreBootstrap from '@app/core/bootstrap';
import * as httpMocks from 'node-mocks-http';

describe('Testing Cache', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // redisConnection(app);
    // coreBootstrap(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Manager should be defined', async () => {
    redisConnection(app);
    expect(manager).toBeDefined();
  });
  it('"app.get" should be called when redisConnection is called', async () => {
    const spy = jest.spyOn(app, 'get');
    redisConnection(app);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
