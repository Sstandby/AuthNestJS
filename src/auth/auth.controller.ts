import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService, RegistrationStatus } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';

import { CreateUserDto, LoginUserDto } from '../users/dto/create-users.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() UserDto: CreateUserDto,
  ): Promise<any> {
    const result: RegistrationStatus = await this.authService.register(UserDto);
    if (!result.success) {
      throw new HttpException(result.message,HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({
    summary: 'Login.',
  })
  @Post('/login')
  async login(@Body() LoginUserDto: LoginUserDto): Promise<any> {
    return this.authService.login(LoginUserDto);
  }
}
