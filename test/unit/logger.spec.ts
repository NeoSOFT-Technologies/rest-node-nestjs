import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import * as fs from 'fs';
import AppLogger from '@app/core/logger/logger';

describe('Testing logger', () => {
  let app: INestApplication;

  const info = {
    timestamp: new Date().toISOString(),
    info_level: 'info',
    error_level: 'error',
    logger_message: 'This is Logger',
    error_message: 'This is error',
    label: 'rest_api',
  };

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
    appLogger.log('This is Logger');

    const data = fs.readFileSync('logs/app.log', 'utf8');
    const textByLine = data.split('\n');
    const dataArray = [...textByLine];

    const log = dataArray[dataArray.length - 2].toString();
    const len = `${info.timestamp} [${config.get('app.name')}] ${info.info_level}: ${info.logger_message}`.length;
    expect(log).toHaveLength(len);
  });

  it('Testing error method from AppLogger class', () => {
    const config = app.get(ConfigService);
    const appLogger = new AppLogger(config);

    appLogger.error('This is error');

    const data = fs.readFileSync('logs/app.log', 'utf8');
    const textByLine = data.split('\n');
    const dataArray = [...textByLine];

    const log = dataArray[dataArray.length - 2].toString();
    const len = `${info.timestamp} [${config.get('app.name')}] ${info.error_level}: ${info.error_message}`.length;
    expect(log).toHaveLength(len);
  });
});
