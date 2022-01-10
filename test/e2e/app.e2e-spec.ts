import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import { AppModule } from '@app/app.module';
import coreBootstrap from '@app/core/bootstrap';

describe('AppController (e2e)', () => {
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

  it('Should return an hello world string along with status code 200', async () => {
    const { body }: any = await request(app.getHttpServer()).get('').expect(StatusCodes.OK);
    expect(body.data).toEqual('Hello World!');
  });
});
