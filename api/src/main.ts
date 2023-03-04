import { MikroORM } from '@mikro-orm/core';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from 'app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Secret Exam')
    .setVersion('1.0')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => {
      const entityName = controllerKey.replace('Controller', '');
      return `${methodKey}${entityName}`;
    },
  };

  const document = SwaggerModule.createDocument(app, config, options);

  SwaggerModule.setup('docs', app, document);

  await app.get(MikroORM).getSchemaGenerator().ensureDatabase();
  await app.get(MikroORM).getSchemaGenerator().updateSchema();
  app.enableCors();
  await app.listen(4000);
}
bootstrap();
