import AppError from '@shared/errors/AppError';
import path from 'path'
import { inject, injectable } from 'tsyringe';
import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { IUserTokenRepository } from '../repositories/IUserTokenRepository';

interface Request {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  private usersRepository: IUsersRepository;

  private mailProvider: IMailProvider;

  private userTokenRepository: IUserTokenRepository

  constructor(
    @inject('UsersRepository')
      usersRepository: IUsersRepository,

      @inject('MailProvider')
      mailProvider: IMailProvider,

      @inject('UserTokenRepository')
      userTokenRepository: IUserTokenRepository,
  ) {
    this.usersRepository = usersRepository;
    this.mailProvider = mailProvider;
    this.userTokenRepository = userTokenRepository;
  }

  public async execute({ email }: Request): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const { token } = await this.userTokenRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs')

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[GoBarber] Recuperação de Senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          token,
          link: `${process.env.APP_WEB_URL}/reset_passwor?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
