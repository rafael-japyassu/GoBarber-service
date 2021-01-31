import AppError from '@shared/errors/AppError';

import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface Request {
  user_id: string;
}

@injectable()
class ProfileService {
  private usersRepository: IUsersRepository;

  constructor(
    @inject('UsersRepository')
      usersRepository: IUsersRepository,
  ) {
    this.usersRepository = usersRepository;
  }

  public async execute({ user_id }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found!', 400);
    }

    return user;
  }
}

export default ProfileService;
