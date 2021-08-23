import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import AppLogger from '@app/core/logger/logger';

describe('Testing logger', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Testing log method from AppLogger class', () => {
    const config = app.get(ConfigService);
    const appLogger = new AppLogger(config);
    const spy = jest.spyOn(appLogger.logger, 'log');
    appLogger.log('This is Logger');
    expect(spy).toHaveBeenCalled();
  });

  it('Testing error method from AppLogger class', () => {
    const config = app.get(ConfigService);
    const appLogger = new AppLogger(config);
    const spy = jest.spyOn(appLogger.logger, 'log');
    appLogger.error('This is error');
    expect(spy).toHaveBeenCalled();
  });
});
