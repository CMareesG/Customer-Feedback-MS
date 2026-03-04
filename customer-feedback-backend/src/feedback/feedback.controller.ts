import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';

import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

import { AuthGuard } from '@nestjs/passport';
import { Feedback } from '@prisma/client';
import { extendedFeedback } from 'src/types/feedback';

@Controller('feedback')
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createFeedback(@Body() dto: CreateFeedbackDto, @Req() req) {
    return this.feedbackService.createFeedback(dto,req.user.id);
  }

  @Get()
  getAllFeedback() {
    return this.feedbackService.getAllFeedback();
  }

  @Get('product/:productId')
  async getFeedbackByProduct(
    @Param('productId') productId: string,
  ): Promise<extendedFeedback[]> {
    return await this.feedbackService.getFeedbackByProductId(productId);
  }

  // NEW — Dashboard stats
  @UseGuards(AuthGuard('jwt'))
  @Get('user/dashboard-stats')
  getDashboardStats(@Req() req) {
    return this.feedbackService.getDashboardStats(req.user.id);
  }

  // NEW — Recent feedback of logged-in user
  @UseGuards(AuthGuard('jwt'))
  @Get('user/recent')
  getRecentFeedback(@Req() req) {
    return this.feedbackService.getRecentFeedback(req.user.id);
  }

  @Get(':id')
  getFeedbackById(@Param('id') id: string) {
    return this.feedbackService.getFeedbackById(id);
  }

  @Patch(':id')
  updateFeedback(@Param('id') id: string, @Body() dto: UpdateFeedbackDto) {
    return this.feedbackService.updateFeedback(id, dto);
  }

  @Delete(':id')
  deleteFeedback(@Param('id') id: string) {
    return this.feedbackService.deleteFeedback(id);
  }
}
