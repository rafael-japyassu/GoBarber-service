import { sign } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import authConfing from '@config/auth';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { IHashProvider } from '../providers/HashProviders/models/IHashProvider';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  private usersRepository: IUsersRepository;

  private hashProvider: IHashProvider;

  constructor(
    @inject('UsersRepository')
      usersRepository: IUsersRepository,
      @inject('HashProvider')
      hashProvider: IHashProvider,
  ) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, authConfing.jwt.secret, {
      subject: user.id,
      expiresIn: authConfing.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
