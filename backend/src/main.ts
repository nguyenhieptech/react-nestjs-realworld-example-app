import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  // Add API prefix
  // https://docs.nestjs.com/faq/global-prefix
  app.setGlobalPrefix('api');

  // CORS
  // https://docs.nestjs.com/security/cors
  app.enableCors();

  // Swagger documentation
  // https://docs.nestjs.com/openapi/introduction
  const config = new DocumentBuilder()
    .setTitle('Fastify NestJS')
    .setDescription('Fastify NestJS API description')
    .setVersion('0.1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3333);
}

bootstrap();
