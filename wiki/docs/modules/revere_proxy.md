# Reverse Proxy Support
## Introduction
- A reverse proxy is an intermediate connection point positioned at a network's edge.
- A **reverse proxy server** is a type of proxy server that typically sits behind the firewall in a private network and directs client requests to the appropriate backend server.
- Reverse proxy support has its many advantages some of them are listed below.
  1. Load Balancing.
  2. Web acceleration.
  3. Security and anonymity.
 
## Why Reverse Proxy Support?
- The primary reason for Reverse Proxy Support in the application is to make the application available thorugh custom domain name.
- We will be using the **Nginx Service** in order to implement Reverse Proxy Support for our application. 
- We have used the **Nginx Service** because most importantly it is and open source, it can handle a karge volume of connection and is widely used around the world by many prominent tech companies.

## Configuration
1. For setting up the Nginx Server we need to first need to create a docker image of Nginx which is to be done in the **docker-compose.yml** file which is present in the **docker** directory inside the **root** directory.
The working directory of the docker-compose can be understood by the      following image.
```
  nginx:
    image: nginx:1.20
    container_name: '${APP_NAME}_nginx'
    networks:
        - internal
    volumes:
        - ./nginx.conf:/etc/nginx/conf.d/default.conf
        - ./certs:/etc/nginx/certs
    ports:
        - '80:80'
        - '443:443'
    healthcheck:
        test: ["CMD", "wget", "-qO-", "http://localhost:5000"]
        interval: 2s
        timeout: 60s
        retries: 30
```
2. The nginx image version we are using is 1.20 since it is the current stable version of **Nginx service**
3. In the volumes section
> ./nginx.conf:/etc/nginx/conf.d/default.conf this represents that the nginx.conf file **overrides** the default.conf file in /etc/nginx/conf.d/default.conf.
4. Meaning of **80:80** means the 80 port of Host maching has been mapped to the port 80 of the docker.
5. Port **80:80** has been used since it is the default port of Nginx Server and **443:443** port is being used for converting the application from **http to https** protocol.
6. The **healthcheck** part of the nginx docker-compose is used to check whether the nginx have found the host successfully or not.
7. Once this setup is done then we move on the **nginx.conf** file for the setup of http server.
8. The setup is done as follows.
```
server {
    listen       80;
    server_name localhost;
    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
}
server {
    listen       80;
    server_name  testurl.neosoft.com;
    location / {
        proxy_pass http://rest_api_nestjs:5000;
    }
}
```
- In the above piece of code we are bypassing our localhost which is represented as **http://rest_api_nestjs:5000**.
- Also we need to make a small change in **package.json** file which is as follows.
```
"db:setup": "docker-compose -f ./docker/docker-compose.yml --env-file ./config/env/.env up -d --build && docker start rest_api_nginx",

```
- Once everything is done then run the command **npm run db:setup** and open any browser and type the url **testurl.neosoft.com** we get the following output.


## Dockerizing NestJs application.
1. In this part we need to dockerize our nestJs application which will help us to save space of our local machine and help us for easy deployment in the cloud.
2. We need to follow the below steps in order to dockerize our NestJs app.

## Steps
- Create a DockerFile in thr **rootDir**
- Add the followind code in the Dockerfile
```
FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000
CMD [ "npm", "run", "start" ]
 ```
- Then we need to create the service of nestjs app inside the docker-compose.yml file which is as follows.
```
  nestjs:
    build:
        context: ./../
    container_name: '${APP_NAME}_nestjs'
    volumes:
        - ./../:/usr/src/app
    networks:
        - internal
    depends_on:
        - database
    ports:
        - '5000:5000'
```
- In this we are exposing our application to the 5000 port
> **Note** It is very important that the nest js application is dependent on the database service hence we are adding the **depends_on** service.