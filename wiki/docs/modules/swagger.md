## Swagger/Open API

- The [OpenAPI](https://swagger.io/specification/) specification is a language-agnostic definition format used to describe RESTful APIs. Nest provides a dedicated [module](https://github.com/nestjs/swagger) which allows generating such a specification by leveraging decorators.

### Refrences

- [OpenAPI (Swagger) | NestJS](https://docs.nestjs.com/openapi/introduction)

### Installation

To begin using it, we first install the required dependencies.

`npm install --save-dev @nestjs/swagger swagger-ui-express`

### Implemenetation

To begin, we will create a new file called `src/swagger/index.ts` into which we will add the following code.

```
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

export const setupSwagger = (app: INestApplication) => {
  const config = app.get(ConfigService);
  const options = new DocumentBuilder()
    .setTitle(config.get(config.get('app.name')))
    .setDescription(`API Documentation for the app ${config.get('app.name')}`)
    .setVersion(config.get('app.vesrion'))
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);
};
```

We need to add the following code to the `src/main.ts` file to call this code, If the environment is dev/local/staging, then only swagger will be enabled.

```
const envList = ['dev', 'staging', 'local', 'test'];

if (envList.includes(config.get('app.env'))) {
    setupSwagger(app);
}
```
