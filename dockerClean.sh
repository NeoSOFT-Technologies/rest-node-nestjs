
#!/bin/bash
echo "Clearing docker containers.."


docker rm -f $(docker ps -aq)

sleep 2

docker volume ls
docker volume prune

echo "Docker container is clean succesfully ..."

