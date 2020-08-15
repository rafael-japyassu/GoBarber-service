import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProviders/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakehashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUsersRepository, fakehashProvider);

    const user = await createUser.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: '12345',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakehashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUsersRepository, fakehashProvider);

    await createUser.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: '12345',
    });

    expect(
      createUser.execute({
        name: 'Jhon Doe',
        email: 'jhondoe@email.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
