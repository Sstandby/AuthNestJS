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
  readonly id: number;

  @IsString()
  @ApiProperty({
    description: 'username del usuario registrado.',
  })
  readonly name: string;

  @IsString()
  @ApiProperty({
    description: 'Crear password del usuario registrado.',
  })
  readonly password: string;
}

export class UpdatePasswordDto {
  @IsNotEmpty()
  @ApiProperty()
  newPassword: string;
  oldPassowrd: string;
}
