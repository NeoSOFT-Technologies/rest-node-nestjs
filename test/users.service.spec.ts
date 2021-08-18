import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from '../src/modules/users/dto/create.user.dto';
import { UpdateUserDto } from '../src/modules/users/dto/update.user.dto';
import { User } from '../src/modules/users/entities/user.entity';
import { UserDbRepository } from '../src/modules/users/repository/db/user.repository';
import { userStub } from '../src/modules/users/user.stub';
import { UsersService } from '../src/modules/users/services/users.service';

describe('UsersService', () => {
  let usersService: UsersService;

  const mockUsersRepository = {
    findUser: jest.fn().mockResolvedValue(userStub()),
    findAllUser: jest.fn().mockResolvedValue([userStub()]),
    createUser: jest.fn().mockResolvedValue(userStub()),
    updateUser: jest.fn().mockResolvedValue(userStub()),
    deleteUser: jest.fn().mockImplementation((dto) => dto),
  };

  beforeEach(async () => {
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

  describe('when findAll is called', () => {
    let users: User[];
    beforeEach(async () => {
      users = await usersService.findAll();
    });
    it('should be defined', () => {
      expect(usersService).toBeDefined();
    });
    it('then usersService.findAll should be defined', () => {
      expect(usersService.findAll).toBeDefined();
    });
    it('then it should return users array', () => {
      expect(users).toEqual([userStub()]);
    });
  });

  describe('when findOne is called', () => {
    let user: User;
    beforeEach(async () => {
      user = await usersService.findOne(userStub().id);
    });

    it('then it should be called with an id', () => {
      expect(mockUsersRepository.findUser).toHaveBeenCalledWith(userStub().id);
    });
    it('then it should return a user', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('when save is called', () => {
    let createuserDto: CreateUserDto;
    beforeEach(async () => {
      createuserDto = {
        firstName: userStub().firstName,
        lastName: userStub().lastName,
      };
      await usersService.save(createuserDto);
    });
    it('then it should be called with a createUserDTO', () => {
      expect(mockUsersRepository.createUser).toHaveBeenCalledWith({
        firstName: userStub().firstName,
        lastName: userStub().lastName,
      });
    });
  });

  describe('when update is called', () => {
    let updateuserDto: UpdateUserDto;
    beforeEach(async () => {
      updateuserDto = {
        firstName: userStub().firstName,
        lastName: userStub().lastName,
        isActive: userStub().isActive,
      };
      await usersService.update(userStub().id, updateuserDto);
    });
    it('then it should be called with a updateUserDTO', () => {
      expect(mockUsersRepository.updateUser).toHaveBeenCalledWith(userStub().id, updateuserDto);
    });
  });

  describe('when remove is called', () => {
    beforeEach(async () => {
      await usersService.remove(userStub().id);
    });
    it('then it should be called with a updateUserDTO', () => {
      expect(mockUsersRepository.deleteUser).toHaveBeenCalledWith(userStub().id);
    });
  });
});
