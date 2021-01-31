/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeUsersRepository: FakeUsersRepository;
let fakeAppointmentRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository()
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentRepository,
    )
  });

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentRepository.create({
      provider_id: '7236487364',
      user_id: '7236487365',
      date: new Date(2020, 10, 18, 14, 0, 0),
    })

    await fakeAppointmentRepository.create({
      provider_id: '7236487364',
      user_id: '7236487365',
      date: new Date(2020, 10, 18, 15, 0, 0),
    })

    jest.spyOn(Date, 'now').mockImplementation(() => new Date(2020, 10, 18, 11).getTime());

    const availability = await listProviderDayAvailability.execute({
      provider_id: '7236487364',
      year: 2020,
      month: 11,
      day: 18,
    })

    expect(availability).toEqual(expect.arrayContaining([
      { hour: 8, available: false },
      { hour: 9, available: false },
      { hour: 10, available: false },
      { hour: 13, available: true },
      { hour: 14, available: false },
      { hour: 15, available: false },
      { hour: 16, available: true },
    ]));
  });
});
