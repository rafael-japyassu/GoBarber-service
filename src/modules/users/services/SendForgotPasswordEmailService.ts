import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface Request {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  private usersRepository: IUsersRepository;

  private mailProvider: IMailProvider;

  constructor(
    @inject('UsersRepository')
      usersRepository: IUsersRepository,

      @inject('MailProvider')
      mailProvider: IMailProvider,
  ) {
    this.usersRepository = usersRepository;
    this.mailProvider = mailProvider;
  }

  public async execute({ email }: Request): Promise<void> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (!checkUserExists) {
      throw new AppError('User does not exists.');
    }

    this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido!');
  }
}

export default SendForgotPasswordEmailService;
