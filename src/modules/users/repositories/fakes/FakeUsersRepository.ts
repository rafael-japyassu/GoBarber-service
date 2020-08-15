import { uuid } from 'uuidv4';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import User from '../../infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuid(), name, email, password,
    });

    this.users.push(user);

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const userFind = this.users.find((user) => user.id === id);

    return userFind;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const userFind = this.users.find((user) => user.email === email);

    return userFind;
  }

  public async save(user: User): Promise<User> {
    const userFind = this.users.findIndex((userUpdate) => userUpdate.id === user.id);

    this.users[userFind] = user;
    return user;
  }
}

export default UsersRepository;
