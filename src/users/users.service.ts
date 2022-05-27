import { Injectable } from '@nestjs/common';
// Interfaz de cada usuario
import { User } from './entities/users.entity';
// Roles
import { Role } from '../roles/role.enum';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      username: 'common_user',
      password: '1234',
      roles: [Role.User],
    },
    {
      id: 1,
      username: 'administrador',
      password: '1111',
      roles: [Role.Admin],
    },
  ];
  // Buscar usuario por username
  async searchUsers(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  // Buscar usuario por id
  async consultId(id: any): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  // Eliminar usuario por id
  async deleteId(id: any): Promise<User[] | undefined> {
    return this.users.filter((user) => user.id !== id);
  }

  // crear usuario
  async newUsers(user): Promise<User | undefined> {
    this.users.push({
      id: this.users.length + 1,
      ...user,
    });
    return this.users[this.users.length - 1];
  }
}
