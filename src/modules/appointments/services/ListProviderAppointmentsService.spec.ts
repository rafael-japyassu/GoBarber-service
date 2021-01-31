/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeUsersRepository: FakeUsersRepository;
let fakeAppointmentRepository: FakeAppointmentsRepository;
let listProvider: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository()
    listProvider = new ListProviderAppointmentsService(
      fakeAppointmentRepository,
    )
  });

  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 10, 18, 14, 0, 0),
    })

    const appointment2 = await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 10, 18, 15, 0, 0),
    })

    jest.spyOn(Date, 'now').mockImplementation(() => new Date(2020, 10, 18, 11).getTime());

    const appointments = await listProvider.execute({
      provider_id: 'provider',
      year: 2020,
      month: 11,
      day: 18,
    })

    expect(appointments).toEqual(expect.arrayContaining([
      appointment1,
      appointment2,
    ]));
  });
});
