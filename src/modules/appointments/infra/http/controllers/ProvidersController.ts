import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderService from '@modules/appointments/services/ListProviderService';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listProviders = container.resolve(ListProviderService);
    const providers = await listProviders.execute({
      user_id: id,
    });

    return response.json(providers);
  }
}
