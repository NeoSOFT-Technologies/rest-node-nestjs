import { Injectable, LoggerService } from '@nestjs/common';
import { Logger, createLogger, format, transports } from 'winston';
import { customLoggerFormat } from '../config/logger';
import * as dotenv from 'dotenv';
import { WinstonLogLevel } from '../config/constants';
dotenv.config();
@Injectable()
export default class AppLogger implements LoggerService {
  private logger: Logger;
  constructor() {
    const { combine, timestamp, label } = format;
    this.logger = createLogger({
      format: combine(label({ label: process.env.APP_NAME }), timestamp(), customLoggerFormat),
      transports: [new transports.Console(), new transports.File({ filename: 'app.log' })],
    });
  }

  log(message: any) {
    this.logger.log(WinstonLogLevel.INFO, message);
  }
  error(message: any) {
    this.logger.log(WinstonLogLevel.ERROR, message);
  }
  warn(message: any) {
    this.logger.log(WinstonLogLevel.WARN, message);
  }
  debug?(message: any) {
    this.logger.log(WinstonLogLevel.DEBUG, message);
  }
  verbose?(message: any) {
    this.logger.log(WinstonLogLevel.VERBOSE, message);
  }
}
