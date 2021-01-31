// import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns'
import { IAppointmentsRepository } from '../repositories/IAppointmentRepository';

interface Request {
  provider_id: string;
  month: number;
  year: number;
}

type Response = Array<{
  day: number;
  available: boolean;
}>

@injectable()
class ListProviderMonthAvailabilityService {
  private appointmentsRepository: IAppointmentsRepository;

  constructor(
    @inject('AppointmentsRepository')
      appointmentsRepository: IAppointmentsRepository,
  ) {
    this.appointmentsRepository = appointmentsRepository
  }

  public async execute({ provider_id, year, month }: Request): Promise<Response> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider({
      provider_id,
      month,
      year,
    })

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    const availability = eachDayArray.map((day) => {
      const appointmentsInDay = appointments.filter(
        (appointment) => getDate(appointment.date) === day,
      )
      return {
        day,
        available: appointmentsInDay.length < 10,
      }
    })

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
