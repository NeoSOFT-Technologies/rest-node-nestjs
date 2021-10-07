import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import coreBootstrap from '@app/core/bootstrap';
import { DatabaseModule } from '@app/db/database.module';
import { UsersModule } from '@app/components/users/users.module';
import { StatusCodes } from 'http-status-codes';
import { TestController } from './controller/test.controller';
import { TestCoreModule } from './module/core-test.module';
import AppLogger from '@app/core/logger/AppLogger';

describe('Testing binded properties of Request and Response with Encryption mode ON', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestCoreModule, DatabaseModule, UsersModule],
      controllers: [TestController],
      providers: [AppLogger],
    }).compile();

    app = moduleFixture.createNestApplication();
    coreBootstrap(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Testing res.success', async () => {
    const { body, statusCode }: any = await request(app.getHttpServer()).get('/users');
    expect(body).toBeDefined();
    expect(statusCode).toEqual(StatusCodes.OK);
  });
  it('Testing res.error', async () => {
    const { body, statusCode }: any = await request(app.getHttpServer()).get('/users/test');
    expect(body).toBeDefined();
    expect(statusCode).toEqual(StatusCodes.UNAUTHORIZED);
  });
  it('Testing res.withMeta', async () => {
    const { body, statusCode }: any = await request(app.getHttpServer()).get('/withMeta');
    expect(body).toBeDefined();
    expect(typeof body).toBe('string');
    expect(statusCode).toEqual(StatusCodes.OK);
  });
  it('Testing res.noContent', async () => {
    const { body, statusCode }: any = await request(app.getHttpServer()).get('/noContent');
    expect(body).toBeDefined();
    expect(typeof body).toBe('object');
    expect(statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it('Testing req.all', async () => {
    const { body, statusCode }: any = await request(app.getHttpServer()).get('/all/test');
    expect(body).toBeDefined();
    expect(typeof body).toBe('string');
    expect(statusCode).toEqual(StatusCodes.OK);
  });
  it('Testing AppLogger', async () => {
    const { body, statusCode }: any = await request(app.getHttpServer()).get('/logger');

    expect(body).toBeDefined();

    expect(typeof body).toBe('string');
    expect(statusCode).toEqual(StatusCodes.OK);
  });
});
