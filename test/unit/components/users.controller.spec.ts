import { Test, TestingModule } from '@nestjs/testing';
import { users } from '@test/mock/users.response';

import { CreateUserDto } from '@app/feature/users/dto/create.user.dto';
import { UpdateUserDto } from '@app/feature/users/dto/update.user.dto';
import { UsersService } from '@app/feature/users/services/users.service';
import { UsersController } from '@app/feature/users/users.controller';

describe('Testing UsersController', () => {
  let usersController: UsersController;

  const mockParam = 'mockID';
  const mockCreateBody: CreateUserDto = {
    firstName: 'string',
    lastName: 'string',
    email: 'string',
    password: 'string',
  };
  const mockUpdateBody: UpdateUserDto = {
    firstName: 'string',
    lastName: 'string',
    isActive: false,
  };

  const mockUsersService = {
    findAll: jest.fn().mockRejectedValueOnce(new Error('Test error')).mockResolvedValue(users),
    findOne: jest.fn().mockRejectedValueOnce(new Error('Test error')).mockResolvedValue(users[0]),
    remove: jest.fn().mockRejectedValueOnce(new Error('Test error')),
    update: jest.fn().mockRejectedValueOnce(new Error('Test error')),
    save: jest.fn().mockRejectedValueOnce(new Error('Test error')),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    usersController = module.get<UsersController>(UsersController);
  });

  it('Testing error cases', async () => {
    expect(async () => {
      await usersController.getUsers();
    }).rejects.toThrowError('Test error');
    expect(async () => {
      await usersController.getUserById('mockID');
    }).rejects.toThrowError('Test error');
    expect(async () => {
      await usersController.saveUser(mockCreateBody);
    }).rejects.toThrowError('Test error');
    expect(async () => {
      await usersController.deleteUser('mockID');
    }).rejects.toThrowError('Test error');
    expect(async () => {
      await usersController.updateUserById(mockUpdateBody, 'mockID');
    }).rejects.toThrowError('Test error');
  });

  it('Testing usercontroller "getUsers"', async () => {
    expect(await usersController.getUsers()).toEqual(users);
  });

  it('Testing usercontroller "getUserById"', async () => {
    expect(await usersController.getUserById(mockParam)).toEqual(users[0]);
  });
  it('Testing usercontroller "saveUser"', async () => {
    expect(await usersController.saveUser(mockCreateBody)).toEqual('success');
  });

  it('Testing usercontroller "deleteUser"', async () => {
    expect(await usersController.deleteUser(mockParam)).toEqual('Deletion Successfull');
  });

  it('Testing usercontroller "updateUserById"', async () => {
    expect(await usersController.updateUserById(mockUpdateBody, mockParam)).toEqual('Updation Successfull');
  });
});
