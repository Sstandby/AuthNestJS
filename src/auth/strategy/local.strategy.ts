import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
// Creamos una clase hija que herede propiedades de una clase padren (PassportStrategy)
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, private moduleRef: ModuleRef) {
    //accedemos a funciones padres con super.
    super({
      //passReqToCallback: true,
    });
  }

  async validate(
    username: string,
    password: string,
    // request: Request,
  ): Promise<any> {
    //const contextId = ContextIdFactory.getByRequest(request);
    //const authService = await this.moduleRef.resolve(AuthService, contextId);
    const user = await this.authService.userValidation(username, password);
    //console.log('User: ', user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
