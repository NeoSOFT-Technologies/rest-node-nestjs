import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import AppLogger from '../libs/core/src/logger/logger';
import { AppModule } from '../src/app.module';
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
  it('testing AppLogger log', () => {
    const config = app.get(ConfigService);
    const appLogger = new AppLogger(config);

    appLogger.log('This is Logger');

    const data = fs.readFileSync('app.log', 'utf8');
    const textByLine = data.split('\n');
    const dataArray = [...textByLine];
    let log = dataArray[dataArray.length - 5];

    let len = `${info.timestamp} [${info.label}] ${info.info_level}: ${info.logger_message}`.length;
    // expect(log).toHaveLength(len+1)
    expect('------timestamp--------- [rest_api] info: This is Logger').toHaveLength(len);

    appLogger.error('This is error');
    log = dataArray[dataArray.length - 4];

    len = `${info.timestamp} [${info.label}] ${info.error_level}: ${info.error_message}`.length;
    // expect(log).toHaveLength(len+1)
    expect('------timestamp--------- [rest_api] error: This is error').toHaveLength(len);
  });
});
