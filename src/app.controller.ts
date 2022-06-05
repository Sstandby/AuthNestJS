import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  Controller,
  Param,
  Delete,
  Patch,
  Body,
  Get,
  Request,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './roles/roles.guard';
import { UsersService } from './users/users.service';
import { Role } from './roles/role.enum';
import { Roles } from './roles/roles.decorator';
import { User as UserModel } from '@prisma/client';

@ApiBearerAuth()
@ApiTags('Login')
@Controller()
export class AppController {
  //UseGuards es un Guardian para validar que una solicitud sea manejada por un controlador
  constructor(private usersService: UsersService) {}

  @Get('profile')
  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Returns user session information',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getProfile(@Request() req): any {
    return req.user;
  }

  @Delete('delete/:id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Delete a user by ID.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getDelete(@Param('id', ParseIntPipe) id): Promise<UserModel> {
    return this.usersService.deleteUser({ id: Number(id) });
  }
}
