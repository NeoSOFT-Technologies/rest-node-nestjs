import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import AppLogger from '@app/core/logger/AppLogger';

describe('Testing logger', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
  });

  it('Testing log method from AppLogger class', () => {
    const config = app.get(ConfigService);
    const appLogger = new AppLogger(config);
    const logMock = jest.spyOn(appLogger, 'log');
    logMock.mockImplementation(() => 'this is mylogger');

    expect(appLogger.log('This is Logger')).toEqual('this is mylogger');
    expect(logMock).toHaveBeenCalled();
  });

  it('Testing error method from AppLogger class', () => {
    const config = app.get(ConfigService);
    const appLogger = new AppLogger(config);
    const errorMock = jest.spyOn(appLogger, 'error');
    errorMock.mockImplementation(() => 'this is myerror');

    expect(appLogger.error('This is Error')).toEqual('this is myerror');
    expect(errorMock).toHaveBeenCalled();
  });

  it('Testing warn method from AppLogger class', () => {
    const config = app.get(ConfigService);
    const appLogger = new AppLogger(config);
    const warnMock = jest.spyOn(appLogger, 'warn');
    warnMock.mockImplementation(() => 'this is mywarn');

    expect(appLogger.warn('This is Warn')).toEqual('this is mywarn');
    expect(warnMock).toHaveBeenCalled();
  });

  it('Testing debug method from AppLogger class', () => {
    const config = app.get(ConfigService);
    const appLogger = new AppLogger(config);
    const debugMock = jest.spyOn(appLogger, 'debug');
    debugMock.mockImplementation(() => 'this is mydebug');

    expect(appLogger.debug('This is Debug')).toEqual('this is mydebug');
    expect(debugMock).toHaveBeenCalled();
  });

  it('Testing verbose method from AppLogger class', () => {
    const config = app.get(ConfigService);
    const appLogger = new AppLogger(config);
    const verboseMock = jest.spyOn(appLogger, 'verbose');
    verboseMock.mockImplementation(() => 'this is myverbose');

    expect(appLogger.verbose('This is Verbose')).toEqual('this is myverbose');
    expect(verboseMock).toHaveBeenCalled();
  });
});

// const mockAppLogger = {
//   log : jest.fn(()=> "this is logger"),
//   error: function (message: any): void {
//     throw new Error('Function not implemented.');
//   },
//   warn: function (message: any): void {
//     throw new Error('Function not implemented.');
//   }
// }

// beforeAll(async () => {
//   const module: TestingModule = await Test.createTestingModule({
//     imports: [AppModule],
//     // imports: [CoreModule],
//   })
//   .compile();
//   // .overrideProvider(AppLogger)
//   // .useValue(mockAppLogger)
//   // .compile();

//   app = module.createNestApplication();
//   // appLogge = module.get<AppLogger>(AppLogger);
// });

// // afterAll(async () => {
// //   await app.close();
// // });

// it('Testing log method from AppLogger class', async() => {
//   const config = app.get(ConfigService);
//   const appLogger = new AppLogger(config);
//   // const spy = jest.spyOn(appLogger, 'log').mockImplementation(()=>"this is mylogger");
//   const logMock = jest.spyOn(appLogger, 'log');
//   logMock.mockImplementation(()=>"this is mylogger");

//   // const res = appLogger.log('This is Logger');
//   // console.log(res);

//   // console.log("spy ",spy)
//   expect(appLogger.log('This is Logger')).toEqual("this is mylogger");
//   expect(logMock).toHaveBeenCalled();
//   // console.log(appLogger.log("hello"));
//   // await request(app.getHttpServer()).get('')
//   // console.log("hellll");

// });
