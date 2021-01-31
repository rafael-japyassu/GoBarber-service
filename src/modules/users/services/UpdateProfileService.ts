import AppError from '@shared/errors/AppError';

import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { IHashProvider } from '../providers/HashProviders/models/IHashProvider';

interface Request {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
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

  public async execute({
    user_id, name, email, password, old_password,
  }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found!', 400);
    }

    const verifyUserEmail = await this.usersRepository.findByEmail(email);

    if (verifyUserEmail && verifyUserEmail.id !== user_id) {
      throw new AppError('E-mail already in use.');
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError('You need to inform old password to set new password.');
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }
    }

    if (password) {
      user.password = await this.hashProvider.generateHash(password)
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
