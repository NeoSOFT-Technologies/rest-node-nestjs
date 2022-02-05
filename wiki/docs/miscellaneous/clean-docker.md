## [Clean Docker Images](https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes)

## How to Do a Clean Restart of a Docker Instance

#### 1. Stop the container(s) using the following command

`docker-compose down`

#### 2. Stop and remove all containers

- List

   `docker ps -a`

- Remove

```
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
```

#### 4.Remove all images

- List

   `docker images -a`

- Remove

```
docker rmi $(docker images -a -q)
```

#### 5. Delete all volumes using the following command

`docker volume rm $(docker volume ls -q)`

#### 6. Restart the containers using the following command

`docker-compose up -d`

