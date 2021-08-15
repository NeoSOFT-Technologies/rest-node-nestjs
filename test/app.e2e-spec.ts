import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import coreBootstrap from '@libs/core/bootstrap';
import { Response } from '@libs/core';

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

  it('should return an hello world string along with status', async () => {
    const { body }: any = await request(app.getHttpServer()).get('').expect(200);
    expect(body.data).toEqual('Hello World!');
  });
});
