/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ProfileService from './ProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ProfileService(
      fakeUsersRepository,
    );
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'fulano@email.com',
      password: '12345',
    })

    const showUser = await showProfile.execute({
      user_id: user.id,
    })

    expect(showUser.name).toBe('Fulano')
  });

  it('should not be able to show the profile from non-existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: '728368172',
      }),
    ).rejects.toBeInstanceOf(AppError)
  });
});
