import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  const { SERVER_PORT } = process.env;
  const port = parseInt(SERVER_PORT, 10) || 9000;
  await app.listen(port);
  console.log(`Server is listening on port ${port}`);
}
bootstrap();
