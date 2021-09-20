import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import coreBootstrap from '@app/core/bootstrap';
import { redisConnection } from '@app/core/middleware/cache.middleware';

describe('Testing compression middleware', () => {
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
  it('checking content-encoding of response', async () => {
    const response = await request(app.getHttpServer()).get('/users');
    expect(response.headers['content-encoding']).toEqual('gzip');
  });
  it('should respond with gzip when "Accept-Encoding: gzip,deflate"', async () => {
    const response = await request(app.getHttpServer()).get('/users').set('Accept-Encoding', 'gzip,deflate');
    expect(response.headers['content-encoding']).toEqual('gzip');
  });
  it('should respond with deflate when "Accept-Encoding: deflate"', async () => {
    const response = await request(app.getHttpServer()).get('/users').set('Accept-Encoding', 'deflate');
    expect(response.headers['content-encoding']).toEqual('deflate');
  });
  it('should skip unknown accept-encoding', async () => {
    const response = await request(app.getHttpServer()).get('/').set('Accept-Encoding', 'bogus');
    expect(response.headers['content-encoding']).toBeUndefined();
    expect(response.headers['content-length']).toBeDefined();
  });
  //   it('should not compress responses below the threshold size', async () => {
  //     const response = await request(app.getHttpServer()).get('');
  //     expect(response.headers['content-encoding']).toBeUndefined();
  //   });
  it('should compress responses above the threshold size', async () => {
    const response = await request(app.getHttpServer()).get('/users');
    expect(response.headers['content-encoding']).toEqual('gzip');
  });
  //   it('should not compress response when x-no-compression header is set', async () => {
  //     const response = await request(app.getHttpServer()).get('/users').set('x-no-compression', 'true');
  //     expect(response.headers['content-encoding']).toBeUndefined();
  //   });
});
