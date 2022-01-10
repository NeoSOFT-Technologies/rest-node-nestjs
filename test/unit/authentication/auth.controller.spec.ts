import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import httpMocks from 'node-mocks-http';

import { AuthController } from '@app/auth/auth.controller';
import { AuthService } from '@app/auth/auth.service';
import { Request, Response } from '@app/core';

describe('Testing AuthController', () => {
  let authController: AuthController;

  const mockRequest: Request = httpMocks.createRequest();

  const mockResponse: Response = httpMocks.createResponse();

  const mockAuthService = {
    generateToken: jest.fn().mockResolvedValue('sampleToken'),
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
    mockResponse.error = jest.fn(() => 'error');
    expect(await authController.generateToken(mockRequest, mockResponse)).toEqual('error');
  });

  it('Testing authcontroller "generateToken"', async () => {
    mockResponse.success = jest.fn((input) => input);
    expect(await authController.generateToken(mockRequest, mockResponse)).toEqual('sampleToken');
  });
});
