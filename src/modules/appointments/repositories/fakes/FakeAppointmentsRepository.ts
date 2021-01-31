import { uuid } from 'uuidv4';
import {
  isEqual, getMonth, getYear, getDate,
} from 'date-fns';

import { IAppointmentsRepository } from '@modules/appointments/repositories/IAppointmentRepository';
import { ICreateAppointmentDTO } from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import Appointment from '../../infra/typeorm/entities/Appointment';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointmens: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointmens.find((appointment) => isEqual(appointment.date, date));
    return findAppointment;
  }

  public async findAllInMonthFromProvider(
    { provider_id, month, year }: IFindAllInMonthFromProviderDTO,
  ): Promise<Appointment[]> {
    const findAppointments = this.appointmens.filter(
      (appointment) => appointment.provider_id === provider_id
      && getMonth(appointment.date) + 1 === month
      && getYear(appointment.date) === year,
    );
    return findAppointments;
  }

  public async findAllInDayFromProvider(
    {
      day, month, provider_id, year,
    }: IFindAllInDayFromProviderDTO,
  ): Promise<Appointment[]> {
    const findAppointments = this.appointmens.filter(
      (appointment) => appointment.provider_id === provider_id
      && getMonth(appointment.date) + 1 === month
      && getYear(appointment.date) === year
      && getDate(appointment.date) === day,
    );
    return findAppointments;
  }

  public async create({ date, provider_id, user_id }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, {
      id: uuid(), date, provider_id, user_id,
    });
    this.appointmens.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;
