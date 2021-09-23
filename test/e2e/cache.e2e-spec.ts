import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import coreBootstrap from '@app/core/bootstrap';
import { CacheMiddleware, manager, redisConnection } from '@app/core/middleware/cache.middleware';
import { ConfigService } from '@nestjs/config';

describe('Testing redis cache manager', () => {
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
  it('Cache middleware should be defined', async () => {
    expect(CacheMiddleware).toBeDefined();
  });

  if (+process.env.USE_CACHING) {
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
  }
});
