import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '@app/components/users/services/users.service';
import { userStub } from '@test/mock/user.stub';
import { AuthService } from '@app/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TestCoreModule } from '../core/guards/module/core-test.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@app/auth/jwt.strategy';

describe('Testing AuthService', () => {
  let authService: AuthService;
  const validateuser = {
    email: 'santoshshinde@gmail.com',
    password: '123456seven',
  };
  const mockUsersService = {
    findEmail: jest.fn().mockResolvedValue(userStub()),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.registerAsync({
          imports: [TestCoreModule],
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
      providers: [AuthService, UsersService, JwtStrategy],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('When generateToken method of auth service is called', () => {
    let token: any;
    beforeAll(async () => {
      token = await authService.generateToken(validateuser);
    });
    it('Then findUserByEmail method of users service should be called with an id', () => {
      expect(mockUsersService.findEmail).toHaveBeenCalledWith(validateuser.email, validateuser.password);
    });
    it('Then findUserByEmail method of users service should return a user', () => {
      expect(token.access_token).toBeDefined();
    });
  });
});
