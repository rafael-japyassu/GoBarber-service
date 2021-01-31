import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer'
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ProfileService from '@modules/users/services/ProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const showProfile = container.resolve(ProfileService);

    const user = await showProfile.execute({ user_id: id });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      name, email, old_password, password,
    } = request.body;
    const { id } = request.user;
    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id: id,
      name,
      email,
      old_password,
      password,
    });

    delete user.password;

    return response.json(classToClass(user));
  }
}
