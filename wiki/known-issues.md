# How to fix “mbind: Operation not permitted” in mysql error log

Add the capability CAP_SYS_NICE to your container until MySQL server can handle the error itself "silently".

```
service:
  mysql:
    image: mysql:8.0.15
    # ...
    cap_add:
      - SYS_NICE  # CAP_SYS_NICE
```
[https://stackoverflow.com/questions/55559386/how-to-fix-mbind-operation-not-permitted-in-mysql-error-log](https://stackoverflow.com/questions/55559386/how-to-fix-mbind-operation-not-permitted-in-mysql-error-log)
[https://docs.docker.com/config/containers/resource_constraints/](https://docs.docker.com/config/containers/resource_constraints/)

# MySQL init script on Docker compose

MySQL Docker container supports executing init scripts on startup, All we need to do is either copy or mount our script files to /docker-entrypoint-initdb.d/ folder inside MySQL docker image.

```
# Docker Compose with MySQL Server
version: '3.3'
services:
  database:
    image: 'mysql:8'
    cap_add:
      - SYS_NICE
    container_name: '${APP_NAME}_mysql'
    hostname: '${APP_NAME}_mysql'
    networks:
        - internal
    ports:
        - '127.0.0.1:${DB_PORT}:3306'
    volumes:
        - ./docker/init.sql:/docker-entrypoint-initdb.d/init.sql
        - mysql:/var/lib/mysql
    env_file:
        - .env
```

# The "class-validator" package is missing. Please, make sure to install this library ($ npm install class-validator) to take advantage of ValidationPipe

`npm install --save class-validator`

# The "class-transformer" package is missing. Please, make sure to install this library ($ npm install class-transformer) to take advantage of ValidationPipe.

`npm install class-transformer --save `

# Map src directory in package.json jest config

[https://github.com/nestjs/nest/issues/4953](https://github.com/nestjs/nest/issues/4953)