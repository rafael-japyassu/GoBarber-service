import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import { IAppointmentsRepository } from '@modules/appointments/repositories/IAppointmentRepository';
import { ICreateAppointmentDTO } from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '../../infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointmens: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointmens.find((appointment) => isEqual(appointment.date, date));
    return findAppointment;
  }

  public async create({ date, provider_id }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });
    this.appointmens.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
