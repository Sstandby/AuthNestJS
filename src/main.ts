import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalGuards(new LocalAuthGuard(new Reflector()));
  //app.useGlobalGuards(new RolesGuard(new Reflector()));
  const config = new DocumentBuilder()
    .setTitle('API Login')
    .setDescription('The Login API description')
    .setVersion('1.0')
    .addTag('Login')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
