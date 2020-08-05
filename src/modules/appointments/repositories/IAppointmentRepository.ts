import Appointment from '../infra/typeorm/entities/Appointment';
import { ICreateAppointmentDTO } from '../dtos/ICreateAppointmentDTO';

export interface IAppointmentsRepository {
  create(appointment: ICreateAppointmentDTO): Promise<Appointment>
  findByDate(date: Date): Promise<Appointment | undefined>
}
