import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();
    const sendEmail = new SendForgotPasswordEmailService(fakeUsersRepository, fakeMailProvider);

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: '12345',
    });

    await sendEmail.execute({
      email: 'jhondoe@email.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();
    const sendEmail = new SendForgotPasswordEmailService(fakeUsersRepository, fakeMailProvider);

    await expect(sendEmail.execute({
      email: 'jhondoe@email.com',
    })).rejects.toBeInstanceOf(AppError);
  });
});
