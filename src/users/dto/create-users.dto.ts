import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsInt()
  @ApiProperty({
    description: 'Id del usuario.',
  })
  readonly id: number;

  @IsString()
  @ApiProperty({
    description: 'username del usuario registrado.',
  })
  readonly username: string;

  @IsString()
  @ApiProperty({
    description: 'Crear password del usuario registrado.',
  })
  readonly password: string;

  @IsString()
  @ApiProperty({
    description: 'Rol de acceso a rutas',
    enum: ['admin', 'user'],
  })
  readonly roles: string;
}
