import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import coreBootstrap from '@app/core/bootstrap';
import { ConfigService } from '@nestjs/config';

describe('Testing compression middleware', () => {
  let app: INestApplication;
  const contentEncoding = 'content-encoding';
  const acceptEncoding = 'Accept-Encoding';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    const config = app.get(ConfigService);
    coreBootstrap(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });
  it('checking content-encoding of response', async () => {
    const response = await request(app.getHttpServer()).get('/users');
    expect(response.headers[contentEncoding]).toEqual('gzip');
  });
  it('should respond with gzip when "Accept-Encoding: gzip,deflate"', async () => {
    const response = await request(app.getHttpServer()).get('/users').set(acceptEncoding, 'gzip,deflate');
    expect(response.headers[contentEncoding]).toEqual('gzip');
  });
  it('should respond with deflate when "Accept-Encoding: deflate"', async () => {
    const response = await request(app.getHttpServer()).get('/users').set(acceptEncoding, 'deflate');
    expect(response.headers[contentEncoding]).toEqual('deflate');
  });
  it('should skip unknown accept-encoding', async () => {
    const response = await request(app.getHttpServer()).get('/').set(acceptEncoding, 'bogus');
    expect(response.headers[contentEncoding]).toBeUndefined();
    expect(response.headers['content-length']).toBeDefined();
  });
  it('should compress responses above the threshold size', async () => {
    const response = await request(app.getHttpServer()).get('/users');
    expect(response.headers[contentEncoding]).toEqual('gzip');
  });
});
