import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as request from 'supertest';
import coreBootstrap from '@app/core/bootstrap';
import appConfig1 from '@test/unit/core/guards/config/appConfig1';
import appConfig2 from '@test/unit/core/guards/config/appConfig2';
import { DatabaseModule } from '@app/db/database.module';
import { UsersModule } from '@app/components/users/users.module';
import { setupAPIVersioning } from '@app/core/api.versioning';
import database from '@app/config/database';
import { StatusCodes } from 'http-status-codes';

describe('Testing API Versioning switch cases', () => {
  let app: INestApplication;
  describe('case "Header"', () => {
    beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [
          DatabaseModule,
          UsersModule,
          ConfigModule.forRoot({
            envFilePath: [`${process.cwd()}/config/env/test.env`],
            isGlobal: true,
            expandVariables: true,
            load: [appConfig1, database],
          }),
        ],
      }).compile();

      app = moduleFixture.createNestApplication();

      coreBootstrap(app);
      setupAPIVersioning(app);
      await app.init();
    });

    afterAll(async () => {
      await app.close();
    });

    it('Should return response from version 1 along with 200 status code - VersioningType - HEADER', async () => {
      const { status, body } = await request(app.getHttpServer()).get('/users').set('custom', '1');

      expect(status).toEqual(StatusCodes.OK);
      const { data } = body;
      expect(data).toEqual('Response from API version 1');
    });
  });
  describe('case "Media Type"', () => {
    beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [
          DatabaseModule,
          UsersModule,
          ConfigModule.forRoot({
            envFilePath: [`${process.cwd()}/config/env/test.env`],
            isGlobal: true,
            expandVariables: true,
            load: [appConfig2, database],
          }),
        ],
      }).compile();

      app = moduleFixture.createNestApplication();

      coreBootstrap(app);
      setupAPIVersioning(app);
      await app.init();
    });

    afterAll(async () => {
      await app.close();
    });

    it('Should return response from version 1 along with 200 status code - VersioningType - MEDIA_TYPE', async () => {
      const { status, body } = await request(app.getHttpServer()).get('/users').set('Accept', 'application/json;v=1');

      expect(status).toEqual(StatusCodes.OK);
      const { data } = body;
      expect(data).toEqual('Response from API version 1');
    });
  });
});
