# [Clean Docker Images](https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes)

# How to Do a Clean Restart of a Docker Instance

### 1. Stop the container(s) using the following command

`docker-compose down`

### 2. Delete all containers using the following command

`docker rm -f $(docker ps -a -q)`

### 3. Delete all volumes using the following command

`docker volume rm $(docker volume ls -q)`

### 4. Restart the containers using the following command

`docker-compose up -d`

