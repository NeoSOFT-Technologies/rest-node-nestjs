import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@app/app.module';
import AppLogger from '@app/core/logger/AppLogger';

describe('Testing logger', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Testing log method from AppLogger class', () => {
    const config = app.get(ConfigService);
    const appLogger = new AppLogger(config);
    const logMock = jest.spyOn(appLogger, 'log');
    logMock.mockImplementation(() => 'This is myLogger');

    expect(appLogger.log('Test string')).toEqual('This is myLogger');
    expect(logMock).toHaveBeenCalled();
  });

  it('Testing error method from AppLogger class', () => {
    const config = app.get(ConfigService);
    const appLogger = new AppLogger(config);
    const errorMock = jest.spyOn(appLogger, 'error');
    errorMock.mockImplementation(() => 'This is myError');

    expect(appLogger.error('Test string')).toEqual('This is myError');
    expect(errorMock).toHaveBeenCalled();
  });

  it('Testing warn method from AppLogger class', () => {
    const config = app.get(ConfigService);
    const appLogger = new AppLogger(config);
    const warnMock = jest.spyOn(appLogger, 'warn');
    warnMock.mockImplementation(() => 'This is myWarn');

    expect(appLogger.warn('Test string')).toEqual('This is myWarn');
    expect(warnMock).toHaveBeenCalled();
  });

  it('Testing debug method from AppLogger class', () => {
    const config = app.get(ConfigService);
    const appLogger = new AppLogger(config);
    const debugMock = jest.spyOn(appLogger, 'debug');
    debugMock.mockImplementation(() => 'This is myDebug');

    expect(appLogger.debug('Test string')).toEqual('This is myDebug');
    expect(debugMock).toHaveBeenCalled();
  });

  it('Testing verbose method from AppLogger class', () => {
    const config = app.get(ConfigService);
    const appLogger = new AppLogger(config);
    const verboseMock = jest.spyOn(appLogger, 'verbose');
    verboseMock.mockImplementation(() => 'This is myVerbose');

    expect(appLogger.verbose('Test string')).toEqual('This is myVerbose');
    expect(verboseMock).toHaveBeenCalled();
  });
});
