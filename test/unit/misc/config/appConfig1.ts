import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  apiVersioning: process.env.API_VERSIONING || 'Header', // URI, Header, Media Type
  apiVersioningHeader: process.env.API_VERSIONING_HEADER || 'custom',
}));
