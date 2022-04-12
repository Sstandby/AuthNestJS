import { Injectable } from '@nestjs/common';
// Interfaz de cada usuario
import { User } from './users.entity';
// Roles
import { Role } from '../roles/role.enum';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      username: 'common_user',
      password: '1234',
      role: Role.User,
    },
    {
      id: 1,
      username: 'administrador',
      password: '1111',
      role: Role.Admin,
    },
  ];
  // Buscar usuario por username
  async consultar_usuario(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  // Buscar usuario por id
  async consultar_id(id: any): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  // Eliminar usuario por id
  async eliminar_id(id: any): Promise<User[] | undefined> {
    return this.users.filter((user) => user.id !== id);
  }

  // crear usuario
  async crear_usuario(user): Promise<User | undefined> {
    this.users.push({
      id: this.users.length + 1,
      ...user,
    });
    return this.users[this.users.length - 1];
  }
}
