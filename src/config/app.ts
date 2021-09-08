import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME || 'rest_api',
  version: process.env.API_VERSION || 'v1',
  env: process.env.APP_ENV || 'local',
  debug: +process.env.APP_DEBUG || 1,
  url: process.env.APP_URL || 'localhost',
  port: +process.env.APP_PORT || 5000,
  logFileName: './logs/app.log',
  applyEncription: +process.env.APPLY_ENCRYPTION,
  apiVersioning: process.env.API_VERSIONING || 'URI', // URI, Header, Media Type
  apiVersioningHeader: process.env.API_VERSIONING_HEADER || 'custom',
  apiVersioningKey: process.env.API_VERSIONING_KEY || 'v=',
}));
