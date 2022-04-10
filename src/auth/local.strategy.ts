import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
// Creamos una clase hija que herede propiedades de una clase padren (PassportStrategy)
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    //accedemos a funciones padres con super.
    super();
  }
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validar_usuario(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
