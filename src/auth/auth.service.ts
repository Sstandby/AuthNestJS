import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '../users/dto/create-users.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './strategy/jwt.strategy';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  // register user in db

  async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'ACCOUNT_CREATE_SUCCESS',
    };

    try {
      status.data = await this.usersService.createUser(userDto);
    } catch(err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  // Validate that the user exists

  async validationUser(payload: JwtPayload): Promise<any> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  // Login

  async login(LoginUserDto: LoginUserDto): Promise<any> {
    const login = await this.usersService.findByPayload(LoginUserDto);
    const payload: JwtPayload = { login };
    return {
      data: login,
      access_token: this.jwtService.sign(payload),
    };
  }
}

export interface RegistrationStatus {
  success: boolean;
  message: string;
  data?: User;
}
