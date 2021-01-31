import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';
import { IAppointmentsRepository } from '../repositories/IAppointmentRepository';

interface Request {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

type Response = Array<{
  hour: number;
  available: boolean;
}>

@injectable()
class ListProviderDayAvailabilityService {
  private appointmentsRepository: IAppointmentsRepository;

  constructor(
    @inject('AppointmentsRepository')
      appointmentsRepository: IAppointmentsRepository,
  ) {
    this.appointmentsRepository = appointmentsRepository
  }

  public async execute({
    provider_id, year, month, day,
  }: Request): Promise<Response> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
      provider_id,
      year,
      day,
      month,
    });

    const hourStart = 8;

    const eachHourArray = Array.from({
      length: 10,
    },
    (_, index) => index + hourStart);

    const availibility = eachHourArray.map((hour) => {
      const hasAppointmentInHour = appointments.find(
        (appointment) => getHours(appointment.date) === hour,
      )

      const currentDate = new Date(Date.now());
      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      }
    })

    return availibility;
  }
}

export default ListProviderDayAvailabilityService;
