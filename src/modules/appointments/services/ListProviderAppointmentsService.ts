import { injectable, inject } from 'tsyringe';
import { IAppointmentsRepository } from '../repositories/IAppointmentRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface Request {
  provider_id: string;
  year: number;
  month: number;
  day: number;
}

@injectable()
class ListProviderAppointmentsService {
  private appointmentsRepository: IAppointmentsRepository;

  constructor(
    @inject('AppointmentsRepository')
      appointmentsRepository: IAppointmentsRepository,
  ) {
    this.appointmentsRepository = appointmentsRepository
  }

  public async execute({
    provider_id, year, month, day,
  }: Request): Promise<Appointment[]> {
    const appointments = this.appointmentsRepository.findAllInDayFromProvider({
      provider_id,
      day,
      month,
      year,
    });

    return appointments;
  }
}

export default ListProviderAppointmentsService;
