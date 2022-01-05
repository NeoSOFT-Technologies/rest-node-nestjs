import { Request, Response } from '@app/core';
import { Test, TestingModule } from '@nestjs/testing';
import * as httpMocks from 'node-mocks-http';
import { AuthController } from '@app/auth/auth.controller';
import { AuthService } from '@app/auth/auth.service';
import { AppModule } from '@app/app.module';
import { ValidateUserDto } from '@app/components/users/dto/validate.user.dto';

describe('Testing AuthController', () => {
  let authController: AuthController;

  const mockRequest: Request = httpMocks.createRequest();

  const mockResponse: Response = httpMocks.createResponse();

  const mockAuthService = {
    generateToken: jest.fn().mockResolvedValue('sampleToken'),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
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
