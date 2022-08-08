import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppLogger } from './util/app-logger';

const LISTEN_PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(LISTEN_PORT);
  const logger = new AppLogger('bootstrap');
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
