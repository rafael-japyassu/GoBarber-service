/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProviders/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'fulano@email.com',
      password: '12345',
    })

    const userUpdated = await updateProfile.execute({
      user_id: user.id,
      name: 'Fulano atualizado',
      email: 'fulano@email.com',
    })

    expect(userUpdated.name).toBe('Fulano atualizado')
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'fulano@email.com',
      password: '12345',
    })

    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@email.com',
      password: '12345',
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Fulano atualizado',
        email: 'fulano@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError)
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'fulano@email.com',
      password: '12345',
    })

    const userUpdated = await updateProfile.execute({
      user_id: user.id,
      name: 'Fulano atualizado',
      email: 'fulano@email.com',
      password: '123123',
      old_password: '12345',
    })

    expect(userUpdated.password).toBe('123123')
  });

  it('should not be able to update the password whithout old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'fulano@email.com',
      password: '12345',
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Fulano atualizado',
        email: 'fulano@email.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to update the password whith wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'fulano@email.com',
      password: '12345',
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Fulano atualizado',
        email: 'fulano@email.com',
        password: '123123',
        old_password: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError)
  });
});
