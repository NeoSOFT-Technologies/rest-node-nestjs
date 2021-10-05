import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { UsersService } from '../../../src/components/users/services/users.service';
import { redisConnection } from '../../../src/core/middleware/cache.middleware';
import coreBootstrap from '@app/core/bootstrap';
import { users } from '../../mock/users.response';
import * as request from 'supertest';
import { Request, Response } from '@app/core';
import { setupAPIVersioning } from '../../../src/core/api.versioning';

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
    const config = app.get(ConfigService);
    if (config.get('app.applyCaching')) {
      redisConnection(app);
    }
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
    class mockRequest implements Partial<Request> {
      all(): Record<string, any> {
        return { key: 'value' };
      }
    }
    const requestObject = new mockRequest();

    const spy = jest.spyOn(requestObject, 'all');
    requestObject.all();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('Mocking Response methods', async () => {
    class mockResponse implements Partial<Response> {
      success(): any {
        return 'mock_success';
      }
      error(): any {
        return 'mock_error';
      }
      noContent(): any {
        return 'mock_noContent';
      }
      withMeta(): any {
        return 'mock_withMeta';
      }
    }
    const responseObject = new mockResponse();

    const spywithMeta = jest.spyOn(responseObject, 'withMeta');
    const spynoContent = jest.spyOn(responseObject, 'noContent');

    expect(responseObject.noContent()).toEqual('mock_noContent');
    expect(responseObject.withMeta()).toEqual('mock_withMeta');
    spywithMeta.mockRestore();
    spynoContent.mockRestore();
  });
});
