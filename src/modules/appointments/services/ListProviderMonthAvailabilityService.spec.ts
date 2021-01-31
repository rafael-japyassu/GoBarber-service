/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeUsersRepository: FakeUsersRepository;
let fakeAppointmentRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    // fakeUsersRepository = new FakeUsersRepository();
    fakeAppointmentRepository = new FakeAppointmentsRepository()
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentRepository,
    )
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentRepository.create({
      provider_id: '123123',
      user_id: '123123',
      date: new Date(2020, 10, 18, 8, 0, 0),
    })
    await fakeAppointmentRepository.create({
      provider_id: '123123',
      user_id: '123123',
      date: new Date(2020, 10, 18, 9, 0, 0),
    })
    await fakeAppointmentRepository.create({
      provider_id: '123123',
      user_id: '123123',
      date: new Date(2020, 10, 18, 10, 0, 0),
    })
    await fakeAppointmentRepository.create({
      provider_id: '123123',
      user_id: '123123',
      date: new Date(2020, 10, 18, 11, 0, 0),
    })
    await fakeAppointmentRepository.create({
      provider_id: '123123',
      user_id: '123123',
      date: new Date(2020, 10, 18, 12, 0, 0),
    })
    await fakeAppointmentRepository.create({
      provider_id: '123123',
      user_id: '123123',
      date: new Date(2020, 10, 18, 13, 0, 0),
    })
    await fakeAppointmentRepository.create({
      provider_id: '123123',
      user_id: '123123',
      date: new Date(2020, 10, 18, 14, 0, 0),
    })
    await fakeAppointmentRepository.create({
      provider_id: '123123',
      user_id: '123123',
      date: new Date(2020, 10, 18, 15, 0, 0),
    })
    await fakeAppointmentRepository.create({
      provider_id: '123123',
      user_id: '123123',
      date: new Date(2020, 10, 18, 16, 0, 0),
    })
    await fakeAppointmentRepository.create({
      provider_id: '123123',
      user_id: '123123',
      date: new Date(2020, 10, 18, 17, 0, 0),
    })

    await fakeAppointmentRepository.create({
      provider_id: '123123',
      user_id: '123123',
      date: new Date(2020, 10, 18, 18, 0, 0),
    })

    await fakeAppointmentRepository.create({
      provider_id: '123123',
      user_id: '123123',
      date: new Date(2020, 10, 19, 8, 0, 0),
    })

    const availability = await listProviderMonthAvailability.execute({
      provider_id: '123123',
      year: 2020,
      month: 11,
    })

    expect(availability).toEqual(expect.arrayContaining([
      { day: 18, available: false },
      { day: 19, available: true },
      { day: 20, available: true },
    ]))
  });
});
