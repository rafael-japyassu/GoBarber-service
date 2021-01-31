import User from '../infra/typeorm/entities/User';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO';

export interface IUsersRepository {
  findAllProviders(findAllProvidersDTO: IFindAllProvidersDTO): Promise<User[]>
  findById(id :string): Promise<User | undefined>
  findByEmail(email :string): Promise<User | undefined>
  create(user: ICreateUserDTO): Promise<User>
  save(user: User): Promise<User>
}
