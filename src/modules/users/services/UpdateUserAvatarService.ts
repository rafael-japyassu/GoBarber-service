import AppError from '@shared/errors/AppError';

import { injectable, inject } from 'tsyringe';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import User from '../infra/typeorm/entities/User';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface Request {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  private usersRepository: IUsersRepository;

  private storageProvider: IStorageProvider;

  constructor(
    @inject('UsersRepository')
      usersRepository: IUsersRepository,

      @inject('StorageProvider')
      storageProvider: IStorageProvider,
  ) {
    this.usersRepository = usersRepository;
    this.storageProvider = storageProvider;
  }

  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticate users can change avatar', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = fileName;

    await this.usersRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
