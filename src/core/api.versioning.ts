import { INestApplication, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const setupAPIVersioning = (app: INestApplication) => {
  const config = app.get(ConfigService);
  switch (config.get('app.apiVersioning')) {
    case 'URI':
      app.enableVersioning({
        type: VersioningType.URI,
      });
      break;
    case 'Header':
      app.enableVersioning({
        type: VersioningType.HEADER,
        header: config.get('app.apiVersioningHeader'),
      });
      break;
    case 'Media Type':
      app.enableVersioning({
        type: VersioningType.MEDIA_TYPE,
        key: config.get('app.apiVersioningKey'),
      });
      break;
    default:
      app.enableVersioning({
        type: VersioningType.URI,
      });
      break;
  }
};
