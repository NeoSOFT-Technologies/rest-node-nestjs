import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { User } from '../../src/components/users/entities/user.entity';
import { UserDbRepository } from '../../src/components/users/repository/db/user.repository';
import { userStub } from '../mock/user.stub';

describe('UsersController', () => {
  let userDbRepository: UserDbRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    userDbRepository = module.get<UserDbRepository>(UserDbRepository);
  });

  it('Testing UserDbRepository method "findUser"', async () => {
    expect(await userDbRepository.findUser('2')).toBeInstanceOf(User);
  });

  it('Testing UserDbRepository method "findUser" - when user not present', async () => {
    expect(async () => await userDbRepository.findUser('test')).rejects.toThrow(
      'Could not find any entity of type "User" matching: "test"'
    );
  });

  it('Testing UserDbRepository method "findAllUser"', async () => {
    expect((await userDbRepository.findAllUser())[0]).toBeInstanceOf(User);
  });

  it('Testing UserDbRepository method "createUser"', async () => {
    expect(await userDbRepository.createUser(userStub())).toEqual({
      id: expect.any(Number),
      ...userStub(),
    });
  });

  it('Testing UserDbRepository method "updateUser"', async () => {
    expect((await userDbRepository.updateUser('2', userStub())).affected).toEqual(1);
  });

  it('Testing UserDbRepository method "updateUser" - when user not present', async () => {
    expect(async () => await userDbRepository.updateUser('test', userStub())).rejects.toThrow(
      'User not found in database'
    );
  });

  it('Testing UserDbRepository method "deleteUser"', async () => {
    await userDbRepository.deleteUser('2');
    expect(async () => await userDbRepository.findUser('2')).rejects.toThrow(
      'Could not find any entity of type "User" matching: "2"'
    );
  });

  it('Testing UserDbRepository method "deleteUser" - when user not present', async () => {
    expect(async () => await userDbRepository.deleteUser('2')).rejects.toThrow('User not found in database');
  });
});
