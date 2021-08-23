CREATE USER nest;

CREATE DATABASE IF NOT EXISTS rest_api;
GRANT ALL PRIVILEGES ON rest_api.* TO 'user'@'%';
GRANT ALL PRIVILEGES ON rest_api.* TO 'nest'@'%';
