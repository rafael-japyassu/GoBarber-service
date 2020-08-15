import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  }

  public async updateAvatar(request: Request, response: Response): Promise<Response> {
    const updadteUserAvatar = container.resolve(UpdateUserAvatarService);
    const user = await updadteUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }

  public async session(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const autheticateUser = container.resolve(AuthenticateUserService);
    const { user, token } = await autheticateUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  }
}
