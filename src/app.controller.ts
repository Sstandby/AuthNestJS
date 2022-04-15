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
import { CreateUserDto } from './users/dto/create-users.dto';
import { User } from './users/entities/users.entity';

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
    summary: 'Ver el perfil actual en el que estas.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getProfile(@Request() req): any {
    return req.user;
  }

  @Patch('crear_users')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Crear usuarios.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    // return body;
    // return `Crear un jugador: ${body.name} y juega de ${body.position}`;
    return this.usersService.crear_usuario(createUserDto);
  }

  @Get('search/:id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Buscar perfil mediante ID',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getSearch(@Param('id', ParseIntPipe) id): Promise<User> {
    return this.usersService.consultar_id(id);
  }

  @Delete('eliminar/:id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Eliminar usuario mediante ID.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getEliminar(@Param('id', ParseIntPipe) id): Promise<User[]> {
    return this.usersService.eliminar_id(id);
  }
}
