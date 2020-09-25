import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { differenceInHours } from 'date-fns';
import { IHashProvider } from '../providers/HashProviders/models/IHashProvider';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { IUserTokenRepository } from '../repositories/IUserTokenRepository';

interface Request {
  password: string;
  token: string;
}

@injectable()
class ResetPasswordService {
  private usersRepository: IUsersRepository;

  private hashProvider: IHashProvider;

  private userTokenRepository: IUserTokenRepository

  constructor(
    @inject('UsersRepository')
      usersRepository: IUsersRepository,

      @inject('HashProvider')
      hashProvider: IHashProvider,

      @inject('UserTokenRepository')
      userTokenRepository: IUserTokenRepository,
  ) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
    this.userTokenRepository = userTokenRepository;
  }

  public async execute({ password, token }: Request): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const tokenCreatedAt = userToken.created_at;

    if (differenceInHours(Date.now(), tokenCreatedAt) > 2) {
      throw new AppError('Token expired');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
