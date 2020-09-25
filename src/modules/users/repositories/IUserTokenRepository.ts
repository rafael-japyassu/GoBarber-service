import UserToken from '../infra/typeorm/entities/UserToken';

export interface IUserTokenRepository {
  generate(user_id: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}
