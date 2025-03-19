import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function main() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('main');
  const port = process.env.PORT ?? 3000;

  const config = new DocumentBuilder()
    .setTitle('API de Maquinaria')
    .setDescription('Documentación de la API para gestionar máquinas')
    .setVersion('1.0')
    .addTag('machines')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(port);
  logger.log(`Server running on port: ${port}`);
}

void main();
