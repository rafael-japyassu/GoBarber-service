import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsrepository';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const fakeNotificationsRepository = new FakeNotificationsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
    );

    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2020, 10, 10, 12).getTime());

    const appointment = await createAppointment.execute({
      date: new Date(2020, 10, 10, 13),
      user_id: '7236487365',
      provider_id: '7236487364',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const fakeNotificationsRepository = new FakeNotificationsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
    );

    const date = new Date(2020, 11, 20, 11);

    await createAppointment.execute({
      date,
      user_id: '7236487365',
      provider_id: '7236487364',
    });

    await expect(
      createAppointment.execute({
        date,
        user_id: '7236487365',
        provider_id: '7236487364',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create appointment on a past date', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const fakeNotificationsRepository = new FakeNotificationsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
    );

    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2020, 4, 10, 12).getTime());

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: '7236487364',
        provider_id: '7236487364',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create appointment whit same user as provider', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const fakeNotificationsRepository = new FakeNotificationsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
    );

    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2020, 10, 10, 12).getTime());

    await expect(
      createAppointment.execute({
        date: new Date(2020, 10, 10, 13),
        user_id: '7236487364',
        provider_id: '7236487364',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create appointment before 8am and after 5pm', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const fakeNotificationsRepository = new FakeNotificationsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
    );

    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2020, 10, 10, 12).getTime());

    await expect(
      createAppointment.execute({
        date: new Date(2020, 10, 10, 7),
        user_id: '7236487364',
        provider_id: '7236487365',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 10, 10, 18),
        user_id: '7236487364',
        provider_id: '7236487365',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
