import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly login: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;
}

export class CreateUserDto {
  @IsInt()
  @ApiProperty({
    description: 'Id del usuario.',
  })
  id: number;

  @IsString()
  @ApiProperty({
    description: 'username del usuario registrado.',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'Crear password del usuario registrado.',
  })
  password: string;
}

export class UpdatePasswordDto {
  @IsNotEmpty()
  @ApiProperty()
  newPassword: string;

  @IsNotEmpty()
  @ApiProperty()
  oldPassowrd: string;
}
