import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';
import coreBootstrap from '@app/core/bootstrap';
import { ConfigService } from '@nestjs/config';
import { redisConnection } from '../../../src/core/middleware/cache.middleware';
import { userStub } from '../../mock/user.stub';
import { StatusCodes } from 'http-status-codes';

describe('Testing middlewares', () => {
  let app: INestApplication;
  const contentEncoding = 'content-encoding';
  const acceptEncoding = 'Accept-Encoding';

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

  describe('Testing compression middleware', () => {
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

    it('should not compress response when x-no-compression header is set', async () => {
      const response = await request(app.getHttpServer()).get('/users').set('x-no-compression', 'true');

      expect(response.headers['content-encoding']).toBeUndefined();
    });
  });

  describe('Testing json bodyparser', () => {
    it('should respond with error when request exceeds memory limit', async () => {
      const user = {
        firstName: Buffer.alloc(1000 * 1000 * 30, userStub().firstName).toString(),
        lastName: Buffer.alloc(1000 * 1000 * 25, userStub().lastName).toString(),
        isActive: userStub().isActive,
      };
      const response = await request(app.getHttpServer()).post('/users').send(user);

      expect(response.body.statusCode).toEqual(StatusCodes.REQUEST_TOO_LONG);
    });
  });

  describe('Testing json urlencoded', () => {
    it('should respond with CREATED when request size is within memory limit', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(`firstName=${userStub().firstName}&lastName=${userStub().lastName}`);

      expect(response.body.code).toEqual(StatusCodes.CREATED);
    });

    it('should respond with error when request size exceeds memory limit', async () => {
      const user = {
        firstName: Buffer.alloc(1000 * 1000 * 30, userStub().firstName).toString(),
        lastName: Buffer.alloc(1000 * 1000 * 25, userStub().lastName).toString(),
      };
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(`firstName=${user.firstName}&lastName=${user.lastName}`);

      expect(response.body.statusCode).toEqual(StatusCodes.REQUEST_TOO_LONG);
    });
  });
});
