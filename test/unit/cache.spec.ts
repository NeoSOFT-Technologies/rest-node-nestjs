import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { CacheMiddleware, manager, redisConnection } from '../../src/core/middleware/cache.middleware';

describe('Testing Cache', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Cache middleware should be defined', async () => {
    expect(CacheMiddleware).toBeDefined();
  });

  if (+process.env.USE_CACHING) {
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
  }
});
