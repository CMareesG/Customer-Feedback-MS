import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedbackModule } from './feedback/feedback.module';
import { PrismaModule } from './prisma/prisma.module';
import { ResponseModule } from './response/response.module';

@Module({
  imports: [FeedbackModule, PrismaModule, PrismaModule, ResponseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
