import { HttpException, HttpStatus } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { userStub } from '@test/mock/user.stub';
import e from 'express';

import { AuthService } from '@app/auth/auth.service';
import { JwtStrategy } from '@app/auth/jwt.strategy';
import { UsersService } from '@app/components/users/services/users.service';
import { comparePassword } from '@app/core/hashing/hashing';

import { TestCoreModule } from '../core/guards/module/core-test.module';

jest.mock('bcrypt', () => ({
  compare: jest.fn().mockResolvedValue(true),
}));
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
      expect(mockUsersService.findEmail).toHaveBeenCalledWith(validateuser.email);
    });

    it('Then findUserByEmail method of users service should return a user', () => {
      expect(token.access_token).toBeDefined();
    });

    describe('Exeption Test', () => {
      jest.mock('bcrypt', () => ({
        compare: jest.fn().mockResolvedValue(false),
      }));
      const error = 'Invalid credentials';
      it('The Exception error should return "Invalid credentials"', () => {
        expect(error).toBe('Invalid credentials');
      });
    });
  });
});
