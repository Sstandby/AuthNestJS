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
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  //UseGuards es un Guardian para validar que una solicitud sea manejada por un controlador
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('crear_users')
  createUser(@Body() body) {
    // return body;
    // return `Crear un jugador: ${body.name} y juega de ${body.position}`;
    return this.usersService.crear_usuario(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('search/:id')
  getSearch(@Param('id', ParseIntPipe) id) {
    return this.usersService.consultar_id(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('eliminar/:id')
  getEliminar(@Param('id', ParseIntPipe) id) {
    return this.usersService.eliminar_id(id);
  }
}
