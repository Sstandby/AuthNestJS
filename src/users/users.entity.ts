import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../roles/role.enum';
@Entity()
export class User {
  id: number;
  username: string;
  password: string;
  roles: Role[];
}
