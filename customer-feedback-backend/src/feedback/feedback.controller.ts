import { Controller, Post, Body, Get, Param, Put, Patch, Delete } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@Controller('feedback')
export class FeedbackController {

  constructor(private feedbackService: FeedbackService) {}

  @Post()
  createFeedback(@Body() dto: CreateFeedbackDto) {
    return this.feedbackService.createFeedback(dto);
  }

  @Get()
  getAllFeedback() {
    return this.feedbackService.getAllFeedback();
  }

  @Get(':id')
  getFeedbackById(@Param('id') id: string) {
    return this.feedbackService.getFeedbackById(id);
  }

  @Patch(':id')
  updateFeedback(
    @Param('id') id: string,
    @Body() dto: UpdateFeedbackDto,
  ) {
    return this.feedbackService.updateFeedback(id, dto);
  }

  @Delete(':id')
  deleteFeedback(@Param('id') id: string){
    return this.feedbackService.deleteFeedback(id);
  }


}
