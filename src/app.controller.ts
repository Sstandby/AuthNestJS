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
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { Role } from './roles/role.enum';
import { Roles } from './roles/roles.decorator';
import { Public } from './auth/auth.decorator';

@Controller()
export class AppController {
  //UseGuards es un Guardian para validar que una solicitud sea manejada por un controlador
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Patch('crear_users')
  createUser(@Body() body) {
    // return body;
    // return `Crear un jugador: ${body.name} y juega de ${body.position}`;
    return this.usersService.crear_usuario(body);
  }

  @Roles(Role.Admin)
  @Get('search/:id')
  getSearch(@Param('id', ParseIntPipe) id) {
    return this.usersService.consultar_id(id);
  }

  @Delete('eliminar/:id')
  getEliminar(@Param('id', ParseIntPipe) id) {
    return this.usersService.eliminar_id(id);
  }
}
