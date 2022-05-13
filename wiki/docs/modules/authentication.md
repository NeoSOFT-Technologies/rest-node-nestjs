# AUTHENTICATION MODULE

## INTORODUCTION
- Authentication is an `essential` part of most applications.
- It helps us to secure our application from the third party viewers.
- There are many different approaches and strategies to handle authentication. 
---
## PASSPORT LIBRARY

- For creating a authentication module in our boilerplate we will be using the library called `passport`.
- [Passport]('https://github.com/jaredhanson/passport') is the most popular node.js authentication library, well-known by the community and successfully used in many production applications.  
- It's straightforward to integrate this library with a Nest application using the `@nestjs/passport` module.

## IMPLEMENTATION

- The method that we are using for authentication is the **`NestJS JWT Authentication`** using `Passport Strategy`.
- `JWT` stands for `JSON WEB TOKENS`. Basically, these tokens are issued by the server after user authentication and can be used for further requests as long as the token is valid. 
- The two high-level requirements for our `NestJS JWT Authentication` is as follows: 
- Let the users authenticate with a username/password. Upon authentication, return a JWT. This JWT can be used for subsequent calls to the application.
- Once the JWT token is generated then that token will be used in the hear of each request as a `Bearer Token` that will validate each API call.
- See below illustration that explains the concept.

![Selection_179](https://user-images.githubusercontent.com/87708447/168235678-fd32d584-84f7-414c-baf3-d4b7a71e82c5.png)
---

## INSTALLATION OF THE PACKAGES

To get started with NestJS JWT, we need to install the below package.
> npm install --save @nestjs/jwt passport-jwt
> npm install --save-dev @types/passport-jwt
> npm i --save @nestjs/passport passport

- The `@nestjs/jwt` package helps with JWT manipulation. 
- The `passport-jwt package` implements the JWT strategy. Also, the `@types/passport-jwt` package provides the type definitions to make development easy.

- Once the installation is done we need to create a Authentication module which is done by creating `auth` folder inside the `src` directory.
- In that folder we will be creating `auth.module.ts`, `auth.controller.ts`, `auth.service.ts` which are the essential files.

## STEP 1 :GENERATING THE JWT

- The first step is for us to be able to generate a JWT and return it as response of the `auth/login` route inside `auth.controller.ts`.
```
  async generateToken(@Req() req: Request, @Res() res: Response): Promise<Response> {
    try {
      const user: ValidateUserDto = req.body;
      const resWithAcessToken = await this.authService.generateToken(user);
      return res.success(resWithAcessToken, StatusCodes.OK);
    } catch (e) {
      return res.error(e);
    }
  }
```
- The `AuthService` class looks like:

```
async generateToken(user: ValidateUserDto): Promise<any> {
    try {
      const userData = await this.findUserByEmail(user);
      const isMatched = await comparePassword(user.password, userData.password);
      if(isMatched) {
        const payload = `${userData.firstName}${userData.id}`;
        const accessToken = this.jwtService.sign(payload);
        return {
          access_token: accessToken,
        };
      } else {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
    } catch (e) {
      throw e;
    }
  }
```
- The `generateToken` method of the `AuthService` class created the JWT after the user credentials are validated. If the credentials are not validated then error will be thrown.
- The `sign` method from `@nestjs/jwt` generates the token.
- The token which is generated will be in the below format:

- Image

## STEP 2: CONFIGURATION INSIDE AUTH MODULE.

- The configuration inside the `auth.module.ts` is as follows.
```
@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return {
          secret: config.get<string>('SECRET_JWT_KEY'),
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule,
    PassportModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  // exports:[AuthService]
})
export class AuthModule {}
``` 
- Here, we are basically registering the `JwtModule`. While doing so, we specify the `secret` key.
- The value of the secret key is been specified in the `.env` file.

## STEP 3: IMPLEMENTING THE JWT PASSPORT STRATEGY

- We need to do this to be able to address our second requirement of protecting endpoints using JWT.
- We will create a new file `jwt.strategy.ts` within the auth folder and place the below code.

```
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('auth.secretKey')
    });
  }

  async validate(payload: any) {
    return {
      firstName: payload.firstName,
      id: payload.id,
    };
  }
}

```
- Basically, here we extend the `PassportStrategy` class and specify that we want to extend the Strategy from `passport-jwt` package.
- Next, we initialize the strategy by passing some parameters in the `super() call`. Below are the parameters in detail:
- **jwtFromRequest:** This parameter specifies the method using which we will extract the JWT from the request. Basically, we use the `fromAuthHeaderAsBearerToken()` method from the `ExtractJwt` package. This is because it is standard practice to pass the JWT token as the bearer token in the authorization header while making API requests.

- **ignoreExpiration:** We set this property as false. This basically means that we want to block requests with expired tokens. If a call is made with an expired token, our application will return 401 or Unauthorized response.

- **secretOrKey:** This is basically the secret key from the `.env` file. Ideally, this should pem-encoded publish key. Also, it should not be exposed publicly. 

- Next, we implement the validate() function in which we simply return the user object.
- This might seem confusing as we are not processing anything in the function.
> This is because for the JWT strategy, passport first verifies the signature of the JWT and decodes the JSON object. Only then does it actually call the validate() function and passes the decoded JSON as payload.
- Basically, this ensures that if the validate() function is called, it means the JWT is also valid

## STEP 4 CREATING AUTH GUARD.
- Finally, we create an Auth Guard with the file name `jwt.auth.guard.ts` that uses the JWT strategy.

```
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

```
- Our JwtAuthGuard extends the AuthGuard provided by the `@nestjs/passport` package.

## STEP 5 PROTECTING THE APIS

- Now, we can simply use this guard in one of the routes that we want to protect using the **UseGuards()** decotrator.

```
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOkResponse({ description: apiResponse.apiUserGetById })
  @ApiBearerAuth('JWT-auth')
  async getUserById(@Req() req: Request, @Res() res: Response, @Param('id') id: string): Promise<Response> {
    try {
      const userById = await this.usersService.findOne(id);
      return res.success(userById, StatusCodes.OK);
    } catch (e) {
      return res.error(e);
    }
  }

```
- Here, the request handler getUserById() uses the JwtAuthGuard. Basically, this means that unless there is a valid JWT in the Authorization header of the incoming HTTP request, the endpoint will not provide a valid response.
---
## OUTPUT WILL BE AS FOLLOWS.

- **CASE 1:** If the token is not entered and the API is being accessed then following will be the output.

![Selection_181](https://user-images.githubusercontent.com/87708447/168236333-be25a152-84e9-42bf-b0eb-3c07cc18c667.png)

- **CASE 2:** If the user credentials are not valid.

![Selection_182](https://user-images.githubusercontent.com/87708447/168236606-39998a73-88d3-4bad-9d03-723640cf197e.png)

- **CASE 3:** If the credentials are valid then the access token is generated.

![Selection_183](https://user-images.githubusercontent.com/87708447/168236814-3aa62556-9f24-4e1f-8f93-e1c9e03e3978.png)


