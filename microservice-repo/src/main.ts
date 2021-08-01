import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

// Create a logger instance
const logger = new Logger('Main');

// Create the microservice options object

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000)
  await logger.log('Microservice is listening...');

}
bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { Logger } from '@nestjs/common';

// const logger = new Logger('Main');

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
//   logger.log('Microservice is listeaning....');
// }
// bootstrap();