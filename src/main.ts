import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { RolesGuard } from './roles/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new LocalAuthGuard(new Reflector()));
  app.useGlobalGuards(new RolesGuard(new Reflector()));
  await app.listen(3000);
}
bootstrap();
