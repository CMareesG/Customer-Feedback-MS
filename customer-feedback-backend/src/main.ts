import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';  
import { existsSync, mkdirSync } from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();  

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const uploadDir = join(process.cwd(), 'uploads');
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir);
  }
  console.log("databaseurl:"+process.env.DATABASE_URL);
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
