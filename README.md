# Nest JS Skeleton for REST Application [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=NeoSOFT-Technologies_rest-node-nestjs&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=NeoSOFT-Technologies_rest-node-nestjs) [![CI](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/actions/workflows/ci.yml/badge.svg)](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/actions/workflows/ci.yml)

A skeleton/boilerplate/starter project for quickly building RESTful APIs using Node.js, NestsJS, Express, and MySQL.

By running one command, you will get a production-ready Node.js app installed and configured on your machine. There are many built-in features in the skeleton, including authentication using JWT, request validation, unit and integration tests, continuous integration, docker support, API documentation, pagination, etc. To learn more about its features, check out the following list.

## Description

- [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

- Nest provides a level of abstraction above these common Node.js frameworks (Express/Fastify) but also exposes their APIs directly to the developer. This allows developers the freedom to use the myriad of third-party modules which are available for the underlying platform.

- There are superb libraries, helpers, and tools that exist for Node (and server-side JavaScript), none of them effectively solve the main problem of — Architecture.

Take it for a test drive. We'd love to hear any feedback you have or if you've thought of a new feature.

## Table of Contents

- [Features](#features)
- [Getting started](#getting=started)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Miscellaneous](#miscellaneous)
- [Trainings](#trainings)
- [Video Tutorials](#video-tutorials)
- [Contributing To This Project](#contributing-to-this-project)
- [Issues and Discussions](#issues-and-discussions)
- [Stay in touch](stay-in-touch)

## Features

- **Quick start**
- **Integrated ESLint, Prettier and Husky**
- **Simple and Standard scaffolding**
- **Production-Ready Skeleton**
- **Followed SOLID Principles**
- **Authentication and authorization**: using [passport](http://www.passportjs.org)
- **Validation**: request data validation using [Nest JS Pipe](https://docs.nestjs.com/techniques/validation)
- **Logging**: using [winston](https://github.com/winstonjs/winston) 
- **Testing**: unit and integration tests using [Jest](https://jestjs.io)
- **Error handling**: centralized error handling mechanism
- **API documentation**: with [swagger](https://docs.nestjs.com/openapi/introduction) 
- **Process management**: advanced production process management using [PM2](https://pm2.keymetrics.io)
- **Dependency management**: with [npm](https://www.npmjs.com/)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)
- **API Versioning**
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
- **Santizing**: sanitize request data against xss and query injection
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Compression**: gzip compression with [compression](https://github.com/expressjs/compression)
- **CI**: Continuous integration with [Travis CI](https://travis-ci.org)
- **Docker support**
- **Git hooks**: with [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged)
- **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)
- **Editor config**: consistent editor configuration using [EditorConfig](https://editorconfig.org)

## Getting started

### Prerequisites

- Node <https://nodejs.org/en/> *use the LTS version*
- NPM
- Docker <https://www.docker.com/>
    - Install Docker Desktop for MAC: [https://docs.docker.com/docker-for-mac/install/](https://docs.docker.com/docker-for-mac/install/)
    - Install Docker Desktop for Windows: [https://docs.docker.com/docker-for-windows/install/](https://docs.docker.com/docker-for-windows/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- NestJS CLI <https://nestjs.com/>


### Setup

To get started, clone the repository to your local computer. Use the following command to run in your terminal.

#### Clone The Application

```bash
// clone the application
$ git clone https://github.com/NeoSOFT-Technologies/rest-node-nestjs.git
```
#### Install The Dependencies

Next, install the packages that are required for this project.

```bash
// Install the required npm modules
$ npm install
```

#### Create The Environment Variables

The `config/env/.env` file should be placed in root folder with the following variables.

- `config/env/.env` : Default Environment File
- `config/env/.env.dev` : Development Environment File
- `config/env/.env.test` : Test Environment File
- `config/env/.env.prod` : Production Environment File


```
# config/env/.env.example

APP_NAME=rest_api
NODE_ENV=dev
DB_HOST=127.0.0.1
DB_DATABASE=rest_api
DB_USER=user
DB_PASSWORD=root
DB_PORT=3306
```

#### Start MySQL Database

In order to use mysql, you need to have it installed in your local machine.
Docker Compose is what we will be using in our case, In the project directory, execute the following command.

```
# build images, create and run containers in background
docker-compose -f ./docker/docker-compose.yml --env-file ./config/env/.env up -d
```

In order to apply your modified code to a running container, you should add a build option.

```
# if source code is changed, rebuild image, recreate and start container
docker-compose  -f ./docker/docker-compose.yml --env-file ./config/env/.env up -d --build
```

#### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

#### Test

For this project, We chose [Jest](https://facebook.github.io/jest/) as our test framework.
While Mocha is probably more common, Mocha seems to be looking for a new maintainer and setting up TypeScript testing in Jest is wicked simple.


```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


#### Running the build

All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.
This is nice because most JavaScript tools have easy to use command line utilities allowing us to not need grunt or gulp to manage our builds.
If you open `package.json`, you will see a `scripts` section with all the different scripts you can call.
To call a script, simply run `npm run <script-name>` from the command line.
You'll notice that npm scripts can call each other which makes it easy to compose complex builds out of simple individual build scripts.
Below is a list of all the scripts this template has available:


| Npm Script | Description  |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `build`                   | Full build. Runs ALL build tasks |
| `start:debug`                   | Performs a full build and then serves the app in watch mode                                       |
| `lint`                    | Runs ESLint on project files                                                                      |
| `format`             | Runs the file formatter                                                              |
| `serve`                   | Runs node on `dist/server.js` which is the apps entry point                                       |
| `start`                   | Does the same as 'npm run serve'. Can be invoked with `npm start`                                 |
| `test`                    | Runs tests using Jest test runner                                                                 |
| `test:watch`              | Runs tests in watch mode                                                                          |
| `doc`              | Generate the project documenation using `compdoc`



## Project Structure

In a TypeScript project, it's best to have separate _source_  and _distributable_ files.
TypeScript (`.ts`) files live in your `src` folder and after compilation are output as JavaScript (`.js`) in the `dist` folder.
The `test` and `views` folders remain top level as expected.

Please find below a detailed description of the app's folder structures:


> **Note!** Make sure you have already built the app using  `npm run build`


| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| ``.vscode``              | Contains VS Code specific settings                                                            |
| ``.github``            | Contains GitHub settings and configurations, including the GitHub Actions workflows            |
| ``dist``                 | Contains the distributable (or output) from your TypeScript build. This is the code you ship  |
| ``node_modules``         | Contains all your npm dependencies                                                            |
| ``src``                  | Contains your source code that will be compiled to the dist dir                               |
| ``src/config``           | Here you will find all the environment configuration necessary to access the application `e.g. .env`
| ``src/components``      | Components define group of files/source that respond to various module(http requests)
| ``src/components/${module_name}/dto/``      |  DTO (Data Transfer Object) Schema, Validation           |
| ``src/components/${module_name}/entities/``      | Entities belongs to that Component             |
| ``src/components/${module_name}/repository/``      |   Repository belongs to that Component           |
| ``src/components/${module_name}/services/``      |  Services belongs to that Component         |
| ``src/components/${module_name}/module_name.controllers.ts``      |  Controller belongs to that Component           |
| ``src/components/${module_name}/module_name.module.ts``      |   Module belongs to that Component          |
| ``src/core``           | All core modules - Guards, Http Request & Response Handler, Logger|
| ``src/main.ts``        | Entry point to your express app                                                               |
| ``test``                | Contains your tests. Separate from source because there is a different build process.         |
| ``config/env/.env.example``             | API keys, tokens, passwords, database URI. Clone this, but don't check it in to public repos. |
| ``package.json``             | File that contains npm dependencies
| ``tsconfig.json``            | Config settings for compiling server code written in TypeScript                               |
| ``tsconfig.build.json``      | Config settings for compiling tests written in TypeScript                                     |
| ``.eslintrc``                | Config settings for ESLint code style checking                                                |
| ``.eslintignore``            | Config settings for paths to exclude from linting                                             |

## Documentation

### 1. Generation with [compdoc](https://docs.nestjs.com/recipes/documentation)

Generate project documentation using the following command (npm 6 is required for npx support). See the [official documentation](https://compodoc.app/guides/usage.html) for more options.

`npm run doc`

OR

`npx @compodoc/compodoc -p tsconfig.json -s`

### 2. [Request and Response Cycle](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main/wiki/modules/request-response.md)

> An explanation of how the request and response cycle works is provided here

#### 2.1 Request and Response Workflow

> Boilerplate has a custom guard enabled for handling response and request for every api. The integration of request response guard is enabled by default with response structure

![Request and Response Cycle](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main/wiki/images/basic-nestJS-lifecycle.png?raw=true)

#### 2.2 Request Workflow

> By creating a workflow, you can specify the template that should be used to create a change request when a request for service is logged.

![Request Workflow](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main/wiki/images/code-flow.jpg?raw=true)

### 3. Modules

- [Logger](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main/wiki/docs/modules/logger.md)
- [Request Response](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main/wiki/docs/modules/request-response.md)
- [Mailer](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main/wiki/docs/modules/mailer.md)
- [Database](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main/wiki/docs/modules/database.md)
- [Reverse Proxy](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main/wiki/docs/modules/reverse_proxy.md)
- [Pattern](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main/wiki/docs/modules/pattern.md)
- [Crypto](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main/wiki/docs/modules/crypto.md)
- [Compression](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main/wiki/docs/modules/compression.md)
- [CORS](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main/wiki/docs/modules/cors.md)
- [Swagger/Open API](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main/wiki/docs/modules/swagger.md)
- [Database Migration](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main/wiki/docs/modules/database.migration.md)
- [Authentication](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main/wiki/docs/modules/authentication.md)

### 3. Modules

- [Coverage](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main/wiki/docs/coverage.md)

## Miscellaneous

- [Known Issues](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main//wiki/docs/miscellaneous/known-issues.md)
- [Git commits](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main/wiki/docs/miscellaneous/git-commits.md)
- [Clean Docker Images](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main/wiki/docs/miscellaneous/clean-docker.md)
- [Installation Pretteri, Husky & Lint](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main/wiki/docs/miscellaneous/installation-pretteri-husky-lint.md)

## Trainings

- [Nest JS for Beginners](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main/wiki/docs/trainings/nestjs.md)
- [Node JS for Beginners](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main/wiki/docs/trainings/nodejs.md)

## Video Tutorials


Below are the video tutorial links for the modules that we have implemented in the boilerplate.

#### The Below list is the demonstration Videos of the various modules in the nestjs boilerplate.

- [Clone and Installation of Boilerplate](https://drive.google.com/file/d/1ApN9nWVRM4Q_yoae6sDLdhcPfCPnGcnR/view?usp=sharing)
- [Docker Container](https://drive.google.com/file/d/1c4YFJfzHvRJqjAFCn4_u8m383ozWtdQ9/view?usp=sharing)
- [Clean Code Architecture](https://drive.google.com/file/d/1s0NgsoyZPb8rWbRMMDjDtG6klafWuhk6/view?usp=sharing)
- [Reverse Proxy Engine](https://drive.google.com/file/d/1r5SPaJe1gg-MISvPMRBHCcBV-zST8wya/view?usp=sharing)
- [Database Handling & Mailer Service](https://drive.google.com/file/d/1K7K08OLuowrpvETrHko4OZjGwFWASoDU/view?usp=sharing)
- [Compression](https://drive.google.com/file/d/18b7TiCnnbcS6OVlKQRVswYKTba-KFuMi/view?usp=sharing)
- [Database Migration](https://drive.google.com/file/d/1WOAMS_dq5O6NQyBW4_PtPkFis0hf2_V7/view?usp=sharing)
- [Error Handling](https://drive.google.com/file/d/1qwx96ExXVVgsYNwRmEObdJ95Bx9AaJlU/view?usp=sharing)
- [Encryption](https://drive.google.com/file/d/1FKoYvI9VPLJ2MukxqZJLrddSBZlP72xS/view?usp=sharing)
- [Logger and Config Handler](https://drive.google.com/file/d/1m27hoLop9KWG7kEyuIhoHav2VxVr0iZj/view?usp=sharing)
- [Email Handler](https://drive.google.com/file/d/1HEX-Yf7BpiQ1-BP5nmbLGuMj7ncDdfAc/view?usp=sharing)
- [Postman Demonstration](https://drive.google.com/file/d/1OnJW6SMylQbJ0qXkGt1lZPjTsRH7Laqy/view?usp=sharing)
- [Swagger Demonstration](https://drive.google.com/file/d/1H7ol96umM5FgPbLv_WmaNLlGAdhGtJ8D/view?usp=sharing)

#### The below list will tell us how to create components in the boilerplate.

- [Create Update Component](https://drive.google.com/file/d/1y1lUEcz_EUDQS8nzu1CRTsycSVtTkKsO/view?usp=sharing)
- [Create Update Component 1](https://drive.google.com/file/d/1m8BAIlZv0Ssfcjr3DrjTpNp6iO2QBAhy/view?usp=sharing)

#### Testing Videos

- [Unit Testing 1](https://drive.google.com/file/d/1E3r7PXap_KMHNX5Q_cFE5loFlSlqM_1h/view?usp=sharing)
- [Unit Testing 2](https://drive.google.com/file/d/1E3r7PXap_KMHNX5Q_cFE5loFlSlqM_1h/view?usp=sharing)
- [Unit Testing 3](https://drive.google.com/file/d/1H6CTJE7Z4QL_GmwXooZ1bp4zGU1mqY1e/view?usp=sharing)

## Contributing To This Project

Contributions are welcome from anyone and everyone. We encourage you to review the [guiding principles for contributing](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main/wiki/docs/contribution.md)

* [Bug reports](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main/wiki/docs/contribution/bug-reports.md)
* [Feature requests](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main/wiki/docs/contribution/feature-requests.md)
* [Pull requests](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main/wiki/docs/contribution/pull-requests.md)

## Issues and Discussions

- [Create New Issue](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/issues/new)
- [Check Existing Issues](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/issues)
- [Discussions](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/discussions)

## Stay in touch

* Website - [https://www.neosofttech.com/](https://www.neosofttech.com/)
* Twitter - [@neosofttech](https://twitter.com/neosofttech)
* Meetup -  [https://www.meetup.com/neosoft-technologies/](https://www.meetup.com/neosoft-technologies/)
* Medium -  [https://medium.com/@neosofttech-technologies-blog](https://medium.com/@neosofttech-technologies-blog)
* GitHub - [https://github.com/NeoSOFT-Technologies](https://github.com/NeoSOFT-Technologies)
* Discord - [NodeJS](https://discord.gg/9xW5gQhQa4)