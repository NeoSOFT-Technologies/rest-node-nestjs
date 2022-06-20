import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { loginCredentials } from '@test/mock/generate-token.stub';
import { mockRequest } from '@test/mock/mock.request';
import { mockResponse } from '@test/mock/mock.response';
import { users } from '@test/mock/users.response';
import request from 'supertest';

import { AppModule } from '@app/app.module';
import { UsersService } from '@app/components/users/services/users.service';
import { setupAPIVersioning } from '@app/core/api.versioning';
import coreBootstrap from '@app/core/bootstrap';

jest.mock('bcrypt', () => ({
  genSalt: jest.fn().mockResolvedValue('Salt'),
  hash: jest.fn().mockResolvedValue('123456seven'),
  compare: jest.fn().mockResolvedValue(true),
}));
describe('Testing request-guard', () => {
  let app: INestApplication;

  const mockUsersService = {
    findAll: jest.fn().mockResolvedValue(users),
    findEmail: jest.fn().mockResolvedValue(users),
    findOne: jest.fn().mockResolvedValue(users),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    app = moduleFixture.createNestApplication();
    coreBootstrap(app);
    setupAPIVersioning(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Testing "success" method of bindResponseHelpers', async () => {
    const loginResponse = await request(app.getHttpServer()).post('/auth/login').send(loginCredentials);
    expect(
      (
        await request(app.getHttpServer())
          .get('/users')
          .set('Authorization', 'Bearer ' + loginResponse.body.data.access_token)
      ).body.data
    ).toEqual(users);
  });

  it('Testing "error" method of bindResponseHelpers - if branch', async () => {
    mockUsersService.findAll = jest.fn().mockImplementation(() => {
      throw {
        message: 'testErrorMessage',
        errors: 'testError',
      };
    });
    const loginResponse = await request(app.getHttpServer()).post('/auth/login').send(loginCredentials);
    expect(
      (
        await request(app.getHttpServer())
          .get('/users')
          .set('Authorization', 'Bearer ' + loginResponse.body.data.access_token)
      ).body.message
    ).toEqual('testErrorMessage');

    expect(
      (
        await request(app.getHttpServer())
          .get('/users')
          .set('Authorization', 'Bearer ' + loginResponse.body.data.access_token)
      ).body.errors
    ).toEqual('testError');
  });

  it('Testing "error" method of bindResponseHelpers - else branch', async () => {
    mockUsersService.findAll = jest.fn().mockImplementation(() => {
      throw 'testErrorMessage';
    });
    const loginResponse = await request(app.getHttpServer()).post('/auth/login').send(loginCredentials);

    expect(
      (
        await request(app.getHttpServer())
          .get('/users')
          .set('Authorization', 'Bearer ' + loginResponse.body.data.access_token)
      ).body.message
    ).toEqual('testErrorMessage');

    expect(
      (
        await request(app.getHttpServer())
          .get('/users')
          .set('Authorization', 'Bearer ' + loginResponse.body.data.access_token)
      ).body.errors
    ).toBeNull();
  });

  it('Mocking Request "all" method', async () => {
    const requestObject = new mockRequest();

    const spy = jest.spyOn(requestObject, 'all');
    requestObject.all();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('Mocking Response methods', async () => {
    const responseObject = new mockResponse();

    const spywithMeta = jest.spyOn(responseObject, 'withMeta');
    const spynoContent = jest.spyOn(responseObject, 'noContent');

    expect(responseObject.noContent()).toEqual('mock_noContent');
    expect(responseObject.withMeta()).toEqual('mock_withMeta');
    spywithMeta.mockRestore();
    spynoContent.mockRestore();
  });
});
