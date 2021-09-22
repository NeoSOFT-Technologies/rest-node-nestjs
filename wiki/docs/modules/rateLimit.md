# API Rate-Limiting
It is a common technique which is used to protect applications from brute-force attacks. This feature has been included in the Boilerplate. We have used [Rate-Limiting](https://docs.nestjs.com/security/rate-limiting#rate-limiting)Nest JS throttle library in order to implement this functionality.
# Why Rate Limiting is used?
- Protection from DDOS(Distributed Denial of Service) attacks.
- Cost Control.
- Server Stability and Consistency.
> Note: Before starting the implementation make it clear on basis of what parameter the Rate-Limiting should be performed. For eg. UserID, IP Address, Location etc.
>

# Configuration
To get started first we need to install the @nestjs/throttler package
```
$ npm i --save @nestjs/throttler
```
# Usability
Once the installation is complete we can proceed forward towards implementation by configuring the **ThrottlerModule** as any other Nest Module using **forRoot** and **forRootAsync** methods. First we will be creating a throttle Module.
```
@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
})
export class ThrottleModule {}
```
Some parameters are explained below
**ttl** :  stands for *time to live*
**limit**: it stands for the maximum numer of requests to be made to the server in the given *ttl*
Once you import the class then you can bind the class. But this is binding will happen locally. If you want to bind the class globally then we have to use the following code snippet in the **Provider** section 
```
{
  provide: APP_GUARD,
  useClass: ThrottlerGuard
}
```
# Async Configuration
As above we have seen example how the Throttle Module can be declared Synchronously now in this section we will see how we can declare it asynchronously. This shall be done with the help of **ConfigModule** and **ConfigService**.

Firstly, we will set the values of **ttl** and **limit** in the .env file
```
THROTTLE_TTL=
THROTTLE_LIMIT=
```
Then the above values can be accessed by declaring the config file for the Throttle module which can be done by creating a **throttle.ts** file in the **config** directory.
Since the rate limiting feature should be applied to the whole application we need to create its folder in the **core** directory and the Module can be implemented asynchronously in the following manner.
```
@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('throttle.ttl'),
        limit: config.get('throttle.limit'),
      }),
    }),
  ],
})
export class ThrottleModule {}
```
Now the rate-limiting functionality has been implemented and now we can run our application by running the command *npm run start:dev*

The output can be seen when a request made to the specific endpoint exceeds a given limit.
>
!['Rate Limit Output'](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main/wiki/images/rate-limit-output.png?raw=true)
>