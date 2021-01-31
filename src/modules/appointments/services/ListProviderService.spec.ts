/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProviderService from './ListProviderService';

let fakeUsersRepository: FakeUsersRepository;
let listProvider: ListProviderService;

describe('ListProvider', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProvider = new ListProviderService(fakeUsersRepository)
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'fulano@email.com',
      password: '12345',
    })

    const user2 = await fakeUsersRepository.create({
      name: 'Fulano 2',
      email: 'fulano2@email.com',
      password: '12345',
    })

    const user = await fakeUsersRepository.create({
      name: 'Logged User',
      email: 'loggeduser@email.com',
      password: '12345',
    })

    const providers = await listProvider.execute({
      user_id: user.id,
    })

    expect(providers).toEqual([
      user1,
      user2,
    ])
  });
});
