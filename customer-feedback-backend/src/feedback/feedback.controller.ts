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
import { Feedback, Role } from '@prisma/client';
import { extendedFeedback } from 'src/types/feedback';
import { RolesGuard } from 'src/user/strategy/roles.guard';
import { Roles } from 'src/user/roles.decorator';

@Controller('feedback')
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles(Role.ADMIN,Role.CUSTOMER)
  createFeedback(@Body() dto: CreateFeedbackDto, @Req() req) {
    return this.feedbackService.createFeedback(dto,req.user.id);
  }

  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Get()
  @Roles(Role.ADMIN,Role.CUSTOMER)
  getAllFeedback() {
    return this.feedbackService.getAllFeedback();
  }

  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Get('product/:productId')
  @Roles(Role.ADMIN,Role.CUSTOMER)
  async getFeedbackByProduct(
    @Param('productId') productId: string,
  ): Promise<extendedFeedback[]> {
    return await this.feedbackService.getFeedbackByProductId(productId);
  }

  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles(Role.ADMIN,Role.CUSTOMER)
  @Get('user/dashboard-stats')
  getDashboardStats(@Req() req) {
    return this.feedbackService.getDashboardStats(req.user.id);
  }

  // NEW — Recent feedback of logged-in user
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles(Role.ADMIN,Role.CUSTOMER)
  @Get('user/recent')
  getRecentFeedback(@Req() req) {
    return this.feedbackService.getRecentFeedback(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Get(':id')
  @Roles(Role.ADMIN,Role.CUSTOMER)
  getFeedbackById(@Param('id') id: string) {
    return this.feedbackService.getFeedbackById(id);
  }

  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  updateFeedback(@Param('id') id: string, @Body() dto: UpdateFeedbackDto) {
    return this.feedbackService.updateFeedback(id, dto);
  }

  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  deleteFeedback(@Param('id') id: string) {
    return this.feedbackService.deleteFeedback(id);
  }
}
