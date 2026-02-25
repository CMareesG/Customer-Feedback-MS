import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';  
import { existsSync, mkdirSync } from 'fs';
import * as dotenv from 'dotenv';
import * as express from 'express';

dotenv.config();  

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const uploadDir = join(process.cwd(), 'uploads');
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir);
  }
  // await app.listen(process.env.PORT ?? 3001);
  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));  
  await app.listen(3000);
}
bootstrap();
