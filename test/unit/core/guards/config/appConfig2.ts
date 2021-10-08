import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  apiVersioning: process.env.API_VERSIONING || 'Media Type', // URI, Header, Media Type
  apiVersioningKey: process.env.API_VERSIONING_KEY || 'v=',
}));
