import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
 
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
 
import * as dotenv from 'dotenv';
import * as express from 'express';
 
dotenv.config();
 
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  // CORS configuration
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
 
  // Create uploads directory if it doesn't exist
  const uploadDir = join(process.cwd(), 'uploads');
 
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir);
  }
 
  // Serve static files
  app.use('/uploads', express.static(uploadDir));
 
  // Optional: global API prefix (recommended with Nginx)
  app.setGlobalPrefix('api');
 
  await app.listen(3000);
 
  console.log(`Server running on http://localhost:3000`);
}
 
bootstrap();