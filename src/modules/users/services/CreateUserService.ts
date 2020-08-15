import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { IHashProvider } from '../providers/HashProviders/models/IHashProvider';

interface Request {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
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

  public async execute({ name, email, password }: Request): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
