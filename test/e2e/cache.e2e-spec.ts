import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import coreBootstrap from '@app/core/bootstrap';
import { CacheMiddleware, manager } from '@app/core/middleware/cache.middleware';

describe('Testing redis cache manager', () => {
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

  it('Cache middleware should be defined', async () => {
    expect(CacheMiddleware).toBeDefined();
  });

  it('Checking "/" key is generated', async () => {
    const response = await request(app.getHttpServer()).get('/');
    expect(await manager.get('/')).toBeDefined();
    expect(await manager.get('/')).toEqual(response.body);
  });

  it('Checking "/users" key is generated', async () => {
    const response = await request(app.getHttpServer()).get('/users');
    expect(await manager.get('/users')).toBeDefined();
    expect(await manager.get('/users')).toEqual(response.body);
  });

  // it("Checking whether response is coming from cache", async () => {
  //   await request(app.getHttpServer()).get('/users');
  //   const response = await request(app.getHttpServer()).get('/users');
  //   console.log('Response Body: ', response.body);
  //   expect(response.body.loadFrom).toEqual('Redis Server');
  // });
});
