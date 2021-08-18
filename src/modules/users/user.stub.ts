import { User } from './entities/user.entity';

export const userStub = (): User => {
  return {
    id: '123',
    firstName: 'Sumit',
    lastName: 'Singh',
    isActive: true,
  };
};
