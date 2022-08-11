import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppLogger } from './util/app-logger';
import * as fs from 'fs';
import { dump } from 'js-yaml';

const LISTEN_PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new AppLogger('bootstrap');
  if (process.env.LEVEL === 'debug') {
    const config = new DocumentBuilder()
      .setTitle('Learn-NestJS')
      .setDescription('learn nestjs API description')
      .setVersion('1.0')
      .addTag('learn')
      .build();
    const options: SwaggerDocumentOptions = {
      operationIdFactory: (_: string, methodKey: string) => methodKey,
    };
    const document = SwaggerModule.createDocument(app, config, options);
    // fs.writeFileSync('./swagger-spec.yaml', dump(document, {}));
    SwaggerModule.setup('learn', app, document);
    logger.log('---- Debug Mode ---');
  }

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(LISTEN_PORT);

  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
