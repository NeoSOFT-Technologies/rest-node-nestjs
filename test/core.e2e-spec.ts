import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from "@nestjs/common";
import { RequestGuard } from "../libs/core/src";
import { AppModule } from '../src/app.module';
import coreBootstrap from '@libs/core/bootstrap';
import AppLogger from '../libs/core/src/logger/logger';
import { ConfigService } from '@nestjs/config';

describe('Core module (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    coreBootstrap(app);
    await app.init();
  });
  afterAll(async () => {
    await app.close();
  })

  describe('TestCases', () => {
    let guard = new RequestGuard();

    it('Testing Request binder', () => {
      expect(guard.bindRequestHelpers).toBeDefined();
    })
    it('Testing Response binder', () => {
      expect(guard.bindResponseHelpers).toBeDefined();
    })
    it('Checking Response binder for valid GET request', async () => {
      const response = await request(app.getHttpServer()).get('/users');
      expect(response.body.success).toBe(true);
    })
    it('Checking Response binder for invalid GET request', async () => {
      const response = await request(app.getHttpServer()).get('/random');
      expect(response.body.error).toBe('Not Found');
    })
    it('Checking Applogger', async () => {
      const config = app.get(ConfigService);
      const applogger = new AppLogger(config);
      const spy = jest.spyOn(applogger, 'log')
      const response = await request(app.getHttpServer()).get('/users');
      if (response.status === 200) {
        applogger.log("Logger class called")
      }
      expect(spy).toHaveBeenCalled();
    })
  })

});