import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from '@app/app.module';
import coreBootstrap from '@app/core/bootstrap';
import { RequestGuard } from '@app/core';
import AppLogger from '@app/core/logger/AppLogger';
import { StatusCodes } from 'http-status-codes';
import { setupAPIVersioning } from '@app/core/api.versioning';
import { UserDbRepository } from '@app/components/users/repository/db/user.repository';
import { userStub } from '@test/mock/user.stub';
import { loginCredentials } from '@test/mock/generate-token.stub';

describe('Core module (e2e)', () => {
  let app: INestApplication;
  let userDbRepository: UserDbRepository;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    userDbRepository = moduleFixture.get<UserDbRepository>(UserDbRepository);
    coreBootstrap(app);
    setupAPIVersioning(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('TestCases', () => {
    it('Testing Request binder', () => {
      const config = app.get(ConfigService);
      const guard = new RequestGuard(config);
      expect(guard.bindRequestHelpers).toBeDefined();
    });

    it('Testing Response binder', () => {
      const config = app.get(ConfigService);
      const guard = new RequestGuard(config);
      expect(guard.bindResponseHelpers).toBeDefined();
    });

    it('Testing UserDbRepository method "createUser"', async () => {
      expect(await userDbRepository.createUser(userStub())).toEqual({
        id: expect.any(Number),
        ...userStub(),
      });
    });

    it('Checking Response binder for valid GET request', async () => {
      const loginResponse = await request(app.getHttpServer()).post('/auth/generateToken').send(loginCredentials);

      const response = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', 'Bearer ' + loginResponse.body.data.access_token);

      expect(response.body.success).toBe(true);
    });

    it('Checking Response binder for invalid GET request', async () => {
      const response = await request(app.getHttpServer()).get('/random');
      expect(response.body.error).toBe('Not Found');
    });

    it('Checking Response binder for invalid GET request', async () => {
      const loginResponse = await request(app.getHttpServer()).post('/auth/generateToken').send(loginCredentials);

      const response = await request(app.getHttpServer())
        .get('/users/test')
        .set('Authorization', 'Bearer ' + loginResponse.body.data.access_token);

      expect(response.body.success).toBe(false);
    });

    it('Checking Applogger', async () => {
      const config = app.get(ConfigService);
      const applogger = new AppLogger(config);
      const spy = jest.spyOn(applogger, 'log');
      const loginResponse = await request(app.getHttpServer()).post('/auth/generateToken').send(loginCredentials);

      const response = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', 'Bearer ' + loginResponse.body.data.access_token);

      if (response.status === StatusCodes.OK) {
        applogger.log('Logger class called');
      }
      expect(spy).toHaveBeenCalled();
    });
  });
});
