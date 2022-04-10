import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//Como UseGuards(AuthGuard('local')) crea caracteres raros usaremos la class generada en local.strategy

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
