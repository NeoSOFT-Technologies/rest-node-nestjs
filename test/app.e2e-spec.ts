import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import coreBootstrap from '@libs/core/bootstrap';
import { users } from './users.response';

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

  it('Should return an hello world string along with status', async () => {
    const { body }: any = await request(app.getHttpServer()).get('').expect(200);
    expect(body.data).toEqual('Hello World!');
  });
  it('Should return users array along with 200 status code', async () => {
    const response = await request(app.getHttpServer()).get('/users').expect(200);
    expect(response.status).toEqual(200);
    expect(response.body.data).toEqual(users);
  });
  it('Should return 201 created status along with success message', async () => {
    const response = await request(app.getHttpServer()).post('/users').send({
      "id": 30,
      "firstName": "Rohit",
      "lastName": "Sharma",
      "isActive": true
    })
    expect(response.status).toBe(201);
    expect(response.body.data).toBe('success');
  });
});
