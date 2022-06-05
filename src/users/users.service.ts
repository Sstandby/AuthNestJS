import { HttpException, HttpStatus } from '@nestjs/common';

import { compare, hash } from 'bcrypt';
import { CreateUserDto, LoginUserDto, UpdatePasswordDto } from './dto/create-users.dto';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

interface FormatLogin extends Partial<User> {
  login: string;
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // auth - Login
  async authlogin({ login, password }: LoginUserDto): Promise<FormatLogin> {
    const user = await this.prisma.user.findFirst({
      where: {
        login,
      },
    });
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // comparing password
    const equal = await compare(password, user.password);

    if (!equal) {
      throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED)
    }

    const { password: p, ...rest } = user;
    return rest;
  }

  async findByPayload({ login }: any): Promise<any> {
    return await this.prisma.user.findFirst({
      where: {
        login,
      },
    });
  }

  async createUser(userDto: CreateUserDto): Promise<any> {
    return await this.prisma.user.create({
      ...userDto,
      role: 'USER' as const,
      password: await hash(userDto.password, 10),
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
