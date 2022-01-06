import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@app/components/users/entities/user.entity';
import { UserDbRepository } from '@app/components/users/repository/db/user.repository';
import { UsersService } from '@app/components/users/services/users.service';
import { userStub } from '@test/mock/user.stub';
import { AuthService } from '@app/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from '@app/auth/auth.module';
import { TestCoreModule } from '../core/guards/module/core-test.module';
import { AppModule } from '@app/app.module';
import { UsersModule } from '@app/components/users/users.module';
import { DatabaseModule } from '@app/db/database.module';

describe('Testing AuthService', () => {
  let authService: AuthService;
  const validateuser = {
    email: 'santoshshinde@gmail.com',
    password: '123456seven',
  };
  const mockUsersService = {
    findEmail: jest.fn().mockResolvedValue(userStub()),
  };

  // beforeAll(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     imports: [AppModule],
  //   })
  //     .overrideProvider(UsersService)
  //     .useValue(mockUsersService)
  //     .compile();

  //   authService = module.get<AuthService>(AuthService);
  // });

  describe('When generateToken method of auth service is called', () => {
    let token: any;
    // beforeAll(async () => {
    //   token = await authService.generateToken(validateuser);
    //   console.log(typeof token);
    // });
    it('Then findUserByEmail method of users service should be called with an id', () => {
      // expect(mockUsersRepository.findUserByEmail).toHaveBeenCalledWith(validateuser.email);
      // expect(mockUsersService.findEmail).toHaveBeenCalledWith(validateuser.email, validateuser.password);
    });
    it('Then findUserByEmail method of users service should return a user', () => {
      // expect(token.access_token).toBeDefined();
    });
  });
});
