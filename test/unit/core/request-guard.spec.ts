import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@app/app.module';
import { UsersService } from '@app/components/users/services/users.service';
import coreBootstrap from '@app/core/bootstrap';
import { users } from '@test/mock/users.response';
import * as request from 'supertest';
import { setupAPIVersioning } from '@app/core/api.versioning';
import { mockResponse } from '@test/mock/mock.response';
import { mockRequest } from '@test/mock/mock.request';

describe('Testing request-guard', () => {
  let app: INestApplication;

  const mockUsersService = {
    findAll: jest.fn().mockResolvedValue(users),
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
    expect((await request(app.getHttpServer()).get('/users')).body.data).toEqual(users);
  });

  it('Testing "error" method of bindResponseHelpers - if branch', async () => {
    mockUsersService.findAll = jest.fn().mockImplementation(() => {
      throw {
        message: 'testErrorMessage',
        errors: 'testError',
      };
    });
    expect((await request(app.getHttpServer()).get('/users')).body.message).toEqual('testErrorMessage');
    expect((await request(app.getHttpServer()).get('/users')).body.errors).toEqual('testError');
  });

  it('Testing "error" method of bindResponseHelpers - else branch', async () => {
    mockUsersService.findAll = jest.fn().mockImplementation(() => {
      throw 'testErrorMessage';
    });
    expect((await request(app.getHttpServer()).get('/users')).body.message).toEqual('testErrorMessage');
    expect((await request(app.getHttpServer()).get('/users')).body.errors).toBeNull();
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
