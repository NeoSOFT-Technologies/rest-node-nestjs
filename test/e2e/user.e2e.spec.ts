import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@app/app.module';
import coreBootstrap from '@app/core/bootstrap';
import { userStub } from '../mock/user.stub';
import { updateUserStub } from '../mock/user.update.stub';
import { ConfigService } from '@nestjs/config';
import { redisConnection } from '../../src/core/middleware/cache.middleware';

describe('AppController (e2e)', () => {
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

  it('Should return 201 created status along with success message', async () => {
    const response = await request(app.getHttpServer()).post('/users').send(userStub());
    expect(response.status).toBe(201);
    expect(response.body.data).toBe('success');
  });

  it('Should return users array along with 200 status code', async () => {
    const { status, body } = await request(app.getHttpServer()).get('/users').expect(200);
    expect(status).toEqual(200);
    const { data } = body;
    expect(data.length).toBeGreaterThanOrEqual(1);
  });

  it('Should return user of specified id along with 200 status code', async () => {
    const response = await request(app.getHttpServer()).get('/users/2').expect(200);
    expect(response.status).toEqual(200);
    expect(response.body.success).toEqual(true);
  });

  it('Should update user of specified id and return 200 status code', async () => {
    const { status, body } = await request(app.getHttpServer()).patch('/users/2').send(updateUserStub());
    expect(status).toEqual(200);
    const { data } = body;
    expect(data).toEqual('Updation Successfull');
  });

  it('Should delete user of specified id and return 200 status code', async () => {
    const { status, body } = await request(app.getHttpServer()).delete('/users/2').expect(200);
    expect(status).toEqual(200);
    const { data } = body;
    expect(data).toEqual('Deletion Successfull');
  });
});
