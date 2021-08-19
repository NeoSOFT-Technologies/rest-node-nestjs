/* eslint @typescript-eslint/no-var-requires: "off" */
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import AppLogger from '../../src/core/logger/logger';
const fs = require('fs');

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

  const info = {
    timestamp: new Date().toISOString(),
    info_level: 'info',
    error_level: 'error',
    logger_message: 'This is Logger',
    error_message: 'This is error',
    label: process.env.APP_NAME,
  };

  it('Testing log method from AppLogger class', () => {
    const config = app.get(ConfigService);
    const appLogger = new AppLogger(config);

    appLogger.log('This is Logger');

    const data = fs.readFileSync('app.log', 'utf8');
    const textByLine = data.split('\n');
    const dataArray = [...textByLine];

    const log = dataArray[dataArray.length - 2];
    const sample_log = '------timestamp--------- [rest_api] info: This is Logger';
    const len = `${info.timestamp} [${info.label}] ${info.info_level}: ${info.logger_message}`.length;

    expect(sample_log).toHaveLength(len);
  });

  it('Testing error method from AppLogger class', () => {
    const config = app.get(ConfigService);
    const appLogger = new AppLogger(config);

    appLogger.error('This is error');

    const data = fs.readFileSync('app.log', 'utf8');
    const textByLine = data.split('\n');
    const dataArray = [...textByLine];

    const log = dataArray[dataArray.length - 1];
    const sample_log = '------timestamp--------- [rest_api] error: This is error';

    const len = `${info.timestamp} [${info.label}] ${info.error_level}: ${info.error_message}`.length;
    expect(sample_log).toHaveLength(len);
  });
});
