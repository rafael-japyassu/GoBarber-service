import { getRepository } from 'typeorm';
import { join, resolve } from 'path';
import { promises } from 'fs';
import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { id: user_id },
    });

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

    await userRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
