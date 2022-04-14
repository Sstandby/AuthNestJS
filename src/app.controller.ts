import {
  Controller,
  Param,
  Delete,
  Patch,
  Body,
  Post,
  Get,
  Request,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './roles/roles.guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { Role } from './roles/role.enum';
import { Roles } from './roles/roles.decorator';

@Controller()
export class AppController {
  //UseGuards es un Guardian para validar que una solicitud sea manejada por un controlador
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getProfile(@Request() req) {
    return req.user;
  }

  @Patch('crear_users')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  createUser(@Body() body) {
    // return body;
    // return `Crear un jugador: ${body.name} y juega de ${body.position}`;
    return this.usersService.crear_usuario(body);
  }

  @Get('search/:id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getSearch(@Param('id', ParseIntPipe) id) {
    return this.usersService.consultar_id(id);
  }

  @Delete('eliminar/:id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getEliminar(@Param('id', ParseIntPipe) id) {
    return this.usersService.eliminar_id(id);
  }
}
