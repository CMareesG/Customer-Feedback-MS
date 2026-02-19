import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { FeedbackModule } from './feedback/feedback.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [FeedbackModule, ProductsModule, PrismaModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
