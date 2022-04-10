import { Injectable } from '@nestjs/common';
// Interfaz de cada usuario
import { User } from './users.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      username: 'common_user',
      password: '1234',
    },
    {
      id: 2,
      username: 'administrador',
      password: '1111',
    },
  ];

  async consultar_usuario(username: string): Promise<User | undefined> {
    return this.users.find(User => User.username === username);
  }

}
