import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from '@app/core/auth/auth.controller';
import { AuthService } from '@app/core/auth/auth.service';
import { ValidateUserDto } from '@app/feature/users/dto/validate.user.dto';

describe('Testing AuthController', () => {
  let authController: AuthController;

  const mockAuthService = {
    generateToken: jest.fn().mockRejectedValueOnce(new Error('Test Error')).mockResolvedValue('sampleToken'),
  };
  const mockBody: ValidateUserDto = {
    email: 'email',
    password: 'password',
  };
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
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
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('Testing error cases', async () => {
    expect(async () => await authController.generateToken(mockBody)).rejects.toThrowError('Test Error');
  });

  it('Testing authcontroller "generateToken"', async () => {
    expect(await authController.generateToken(mockBody)).toEqual('sampleToken');
  });
});
