import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const LISTEN_PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(LISTEN_PORT);
  console.log(`Listen:: ${await app.getUrl()}`);
}
bootstrap();
