# Caching


Caching is simple technique that helps us to increase the app's performance. It acts as a temporary data store providing a fast data access. Caching Module is present in the boiler Plate. We have used the [Caching] (https://docs.nestjs.com/techniques/caching)library present in NestJS in order to implemtent Caching functionality.

The objective of the Caching module 

1)The main objective of the Caching module is to reduce the response time from the server to the client, thereby improving the user experience.
2)A cache's primary purpose is to increase data retrieval performance by reducing the need to access the underlying slower storage layer.
3)Trading off capacity for speed, a cache typically stores a subset of data transiently, in contrast to databases whose data is usually complete and durable.

# Configuration

To start the Caching service we first need to install cache-manager and its corressponding packages.
```
$ npm install cache-manager
$ npm install -D @types/cache-manager
```
# Redis
For caching we will be using [Redis](https://redis.io) which is an in-memory data structure store which can be used as a database, cache and message-broker.Redis offers purpose-built in-memory data structures and operators to manage real-time geospatial data at scale and speed.

We have to use redis store which is available in the cache-manager store that we have installed earlier. We can install it in the following way.
```
$ npm install cache-manager-redis-store --save
```
Now we are ready to use redis as our data storage for cache memory
Then we have to set the following constants in the .env file
```
REDIS_HOST='localhost'
REDIS_PORT=6379
CACHE_TTL=10
```
Once these constants are set in the .env file we have to import this constants in the cacheMiddleware.ts file which is present in the middleware folder in the core directory and the caching module is ready to use.

# Advantages of Caching
- Improve Application Performance.
- Reduce Database Cost.
- Reduce the Load on the Backend.
- Eliminate Database Hotspots.
- Increase Read Throughput (IOPS).
- Predictable Performance.
