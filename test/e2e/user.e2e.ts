import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { loginCredentials } from '@test/mock/generate-token.stub';
import { userStub } from '@test/mock/user.stub';
import { updateUserStub } from '@test/mock/user.update.stub';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import { AppModule } from '@app/app.module';
import { setupAPIVersioning } from '@app/core/api.versioning';
import coreBootstrap from '@app/core/bootstrap';
import { setupSwagger } from '@app/swagger';

export const AppController_test = () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    coreBootstrap(app);
    setupAPIVersioning(app);
    setupSwagger(app);
    await app.init();
    const loginResponse = await request(app.getHttpServer()).post('/auth/login').send(loginCredentials);
    token = loginResponse && loginResponse.body && loginResponse.body.data ? token : '';
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should return 201 created status along with success message', async () => {
    const response = await request(app.getHttpServer()).post('/users').send(userStub());
    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body.data).toBe('success');
  });

  it('Should return response from version 1 along with 200 status code', async () => {
    const { status, body } = await request(app.getHttpServer())
      .get('/v1/users')
      .set('Authorization', 'Bearer ' + token)
      .expect(StatusCodes.OK);

    expect(status).toEqual(StatusCodes.OK);
    const { data } = body;
    expect(data).toEqual('Response from API version 1');
  });

  it('Should return response from version 2 along with 200 status code', async () => {
    const { status, body } = await request(app.getHttpServer())
      .get('/v2/users')
      .set('Authorization', 'Bearer ' + token)
      .expect(StatusCodes.OK);

    expect(status).toEqual(StatusCodes.OK);
    const { data } = body;
    expect(data).toEqual('Response from API version 2');
  });

  it('Should return users array along with 200 status code', async () => {
    const loginResponse = await request(app.getHttpServer()).post('/auth/login').send(loginCredentials);
    const token = loginResponse.body.data.access_token;
    const { status, body } = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', 'Bearer ' + token)
      .expect(StatusCodes.OK);

    expect(status).toEqual(200);
    const { data } = body;
    expect(data.length).toBeGreaterThanOrEqual(1);
  });

  it('Should return user of specified id along with 200 status code', async () => {
    const loginResponse = await request(app.getHttpServer()).post('/auth/login').send(loginCredentials);
    const token = loginResponse.body.data.access_token;
    const response = await request(app.getHttpServer())
      .get('/users/2')
      .set('Authorization', 'Bearer ' + token)
      .expect(StatusCodes.OK);

    expect(response.status).toEqual(StatusCodes.OK);
    expect(response.body.success).toEqual(true);
  });

  it('Should update user of specified id and return 200 status code', async () => {
    const loginResponse = await request(app.getHttpServer()).post('/auth/login').send(loginCredentials);
    const token = loginResponse.body.data.access_token;
    const { status, body } = await request(app.getHttpServer())
      .patch('/users/2')
      .set('Authorization', 'Bearer ' + token)
      .send(updateUserStub());

    expect(status).toEqual(StatusCodes.OK);
    const { data } = body;
    expect(data).toEqual('Updation Successfull');
  });

  it('Should delete user of specified id and return 200 status code', async () => {
    const loginResponse = await request(app.getHttpServer()).post('/auth/login').send(loginCredentials);
    const token = loginResponse.body.data.access_token;
    const { status, body } = await request(app.getHttpServer())
      .delete('/users/2')
      .set('Authorization', 'Bearer ' + token)
      .expect(StatusCodes.OK);

    expect(status).toEqual(StatusCodes.OK);
    const { data } = body;
    expect(data).toEqual('Deletion Successfull');
  });

  it('Testing Swagger module - should return HTML in response', async () => {
    const response = await request(app.getHttpServer()).get('/api/docs');
    expect(response.headers['content-type']).toContain('text/html');
  });
};
