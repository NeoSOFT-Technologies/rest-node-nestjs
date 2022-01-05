import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@app/app.module';
import coreBootstrap from '@app/core/bootstrap';
import { userStub } from '@test/mock/user.stub';
import { updateUserStub } from '@test/mock/user.update.stub';
import { setupAPIVersioning } from '@app/core/api.versioning';
import { setupSwagger } from '@app/swagger';
import { StatusCodes } from 'http-status-codes';
import { loginCredentials } from '@test/mock/generate-token.stub';

export const AppController_test = () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    coreBootstrap(app);
    setupAPIVersioning(app);
    setupSwagger(app);
    await app.init();
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
    const loginResponse = await request(app.getHttpServer()).post('/auth/generateToken').send(loginCredentials);

    const { status, body } = await request(app.getHttpServer())
      .get('/v1/users')
      .set('Authorization', 'Bearer ' + loginResponse.body.data.access_token)
      .expect(StatusCodes.OK);

    expect(status).toEqual(StatusCodes.OK);
    const { data } = body;
    expect(data).toEqual('Response from API version 1');
  });

  it('Should return response from version 2 along with 200 status code', async () => {
    const loginResponse = await request(app.getHttpServer()).post('/auth/generateToken').send(loginCredentials);

    const { status, body } = await request(app.getHttpServer())
      .get('/v2/users')
      .set('Authorization', 'Bearer ' + loginResponse.body.data.access_token)
      .expect(StatusCodes.OK);

    expect(status).toEqual(StatusCodes.OK);
    const { data } = body;
    expect(data).toEqual('Response from API version 2');
  });

  it('Should return users array along with 200 status code', async () => {
    const loginResponse = await request(app.getHttpServer()).post('/auth/generateToken').send(loginCredentials);

    const { status, body } = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', 'Bearer ' + loginResponse.body.data.access_token)
      .expect(StatusCodes.OK);

    expect(status).toEqual(200);
    const { data } = body;
    expect(data.length).toBeGreaterThanOrEqual(1);
  });

  it('Should return user of specified id along with 200 status code', async () => {
    const loginResponse = await request(app.getHttpServer()).post('/auth/generateToken').send(loginCredentials);

    const response = await request(app.getHttpServer())
      .get('/users/2')
      .set('Authorization', 'Bearer ' + loginResponse.body.data.access_token)
      .expect(StatusCodes.OK);

    expect(response.status).toEqual(StatusCodes.OK);
    expect(response.body.success).toEqual(true);
  });

  it('Should update user of specified id and return 200 status code', async () => {
    const loginResponse = await request(app.getHttpServer()).post('/auth/generateToken').send(loginCredentials);

    const { status, body } = await request(app.getHttpServer())
      .patch('/users/2')
      .set('Authorization', 'Bearer ' + loginResponse.body.data.access_token)
      .send(updateUserStub());

    expect(status).toEqual(StatusCodes.OK);
    const { data } = body;
    expect(data).toEqual('Updation Successfull');
  });

  it('Should delete user of specified id and return 200 status code', async () => {
    const loginResponse = await request(app.getHttpServer()).post('/auth/generateToken').send(loginCredentials);

    const { status, body } = await request(app.getHttpServer())
      .delete('/users/2')
      .set('Authorization', 'Bearer ' + loginResponse.body.data.access_token)
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
