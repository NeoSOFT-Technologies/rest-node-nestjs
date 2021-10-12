import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from '@app/components/users/dto/create.user.dto';
import { UpdateUserDto } from '@app/components/users/dto/update.user.dto';
import { User } from '@app/components/users/entities/user.entity';
import { UserDbRepository } from '@app/components/users/repository/db/user.repository';
import { UsersService } from '@app/components/users/services/users.service';
import { userStub } from '@test/mock/user.stub';

describe('Testing UsersService', () => {
  let usersService: UsersService;
  let userId = '1';
  const mockUsersRepository = {
    findUser: jest.fn().mockResolvedValue(userStub()),
    findAllUser: jest.fn().mockResolvedValue([userStub()]),
    createUser: jest.fn().mockResolvedValue(userStub()),
    updateUser: jest.fn().mockResolvedValue(userStub()),
    deleteUser: jest.fn().mockImplementation((dto) => dto),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserDbRepository),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  describe('When findAll method of users service is called', () => {
    let users: User[];
    beforeAll(async () => {
      users = await usersService.findAll();
      if (users && users.length) {
        userId = users[0].id;
      }
    });
    it('Then usersService should be defined', () => {
      expect(usersService).toBeDefined();
    });
    it('Then findAll method of users service should be defined', () => {
      expect(usersService.findAll).toBeDefined();
    });

    it('Then findAll method of users service should return users array', () => {
      expect(users).toEqual([userStub()]);
    });
  });

  describe('When findOne method of users service is called', () => {
    let user: User;
    beforeAll(async () => {
      user = await usersService.findOne(userId);
    });
    it('Then findOne method of users service should be called with an id', () => {
      expect(mockUsersRepository.findUser).toHaveBeenCalledWith(userId);
    });
    it('Then findOne method of users service should return a user', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('When save method of users service is called', () => {
    let createuserDto: CreateUserDto;
    beforeAll(async () => {
      createuserDto = {
        firstName: userStub().firstName,
        lastName: userStub().lastName,
      };
      await usersService.save(createuserDto);
    });
    it('Then save method of users service should be called with a createUserDTO', () => {
      expect(mockUsersRepository.createUser).toHaveBeenCalledWith({
        firstName: userStub().firstName,
        lastName: userStub().lastName,
      });
    });
  });

  describe('When update method of users service is called', () => {
    let updateuserDto: UpdateUserDto;
    beforeAll(async () => {
      updateuserDto = {
        firstName: userStub().firstName,
        lastName: userStub().lastName,
        isActive: userStub().isActive,
      };
      await usersService.update(userId, updateuserDto);
    });
    it('Then update method of users service should be called with a updateUserDTO', () => {
      expect(mockUsersRepository.updateUser).toHaveBeenCalledWith(userId, updateuserDto);
    });
  });

  describe('When remove method of users service is called', () => {
    beforeAll(async () => {
      await usersService.remove(userId);
    });
    it('Then remove method of users service should be called with a updateUserDTO', () => {
      expect(mockUsersRepository.deleteUser).toHaveBeenCalledWith(userId);
    });
  });
});
