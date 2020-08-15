import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProviders/fakes/FakeHashProvider';

describe('AuthenticateUserUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakehashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUsersRepository, fakehashProvider);
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakehashProvider);

    await createUser.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: '12345',
    });

    const response = await authenticateUser.execute({
      email: 'jhondoe@email.com',
      password: '12345',
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate with incorrect email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakehashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUsersRepository, fakehashProvider);
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakehashProvider);

    await createUser.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: '12345',
    });

    expect(
      authenticateUser.execute({
        email: 'jhondoe2@email.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with incorrect password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakehashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUsersRepository, fakehashProvider);
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakehashProvider);

    await createUser.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: '12345',
    });

    expect(
      authenticateUser.execute({
        email: 'jhondoe@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
