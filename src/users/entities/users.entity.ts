import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../roles/role.enum';

@Entity()
export class User {
  @ApiProperty({
    example: 1,
    description:
      'Este es el ID del usuario, ira cambiando mientras mas usuarios existan',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'username: "common_user"',
    description: 'Es el usuario a registrar',
  })
  @Column({ unique: true })
  username: string;

  @ApiProperty({
    example: 'password: "1234"',
    description: 'Es la contraseña a registrar',
  })
  @Column({ unique: true })
  password: string;

  @ApiProperty({
    example: 'roles: "user"',
    description:
      'Es el rol que tendra el usuario para el uso de ciertas rutas.',
  })
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  roles: Role[];
}
