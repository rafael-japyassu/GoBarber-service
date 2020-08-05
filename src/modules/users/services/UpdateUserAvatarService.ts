import { join, resolve } from 'path';
import { promises } from 'fs';
import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticate users can change avatar', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = join(resolve(__dirname, '..', '..', 'tmp'), user.avatar);
      const userAvatarFileExists = await promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await this.usersRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
