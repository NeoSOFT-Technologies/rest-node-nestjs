
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.


## Getting started

Skeleton for REST API applications written in Node JS & Nest JS with TypeScript

### Prerequisites

- Node <https://nodejs.org/en/> *use the LTS version*
- NPM
- Docker <https://www.docker.com/>
    - Install Docker Desktop for MAC: [https://docs.docker.com/docker-for-mac/install/](https://docs.docker.com/docker-for-mac/install/)
    - Install Docker Desktop for Windows: [https://docs.docker.com/docker-for-windows/install/](https://docs.docker.com/docker-for-windows/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- NestJS CLI <https://nestjs.com/>

### Create development environment

To get started, clone the repository to your local computer. Use the following command to run in your terminal.

```bash
// clone the application
$ git clone https://github.com/NeoSOFT-Technologies/rest-node-nestjs.git
```

Next, install the packages that are required for this project.

```bash
// Install the required npm modules
$ npm install
```

### Create the Environment Variables

The `.env` file should be placed in root folder with the following variables.

```
# .env.example

APP_NAME=rest_api
NODE_ENV=dev
DB_HOST=127.0.0.1
DB_NAME=rest_api
DB_USER=user
DB_PASSWORD=root
DB_PORT=3306
```

### Start MySQL Database

In order to use mysql, you need to have it installed in your local machine.
Docker Compose is what we will be using in our case, In the project directory, execute the following command.

```
# build images, create and run containers in background
docker-compose up -d
```

In order to apply your modified code to a running container, you should add a build option.

```
# if source code is changed, rebuild image, recreate and start container
docker-compose up -d --build
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```