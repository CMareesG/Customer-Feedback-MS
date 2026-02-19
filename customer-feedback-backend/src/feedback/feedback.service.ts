import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FeedbackService {

  constructor(private prisma: PrismaService)
  {}

  async createFeedback(dto: CreateFeedbackDto){
    return this.prisma.feedback.create({
      data: {
        productId: dto.productId,
        userId: dto.userId,
        rating: dto.rating,
        review: dto.review,
      },
    });
  }

  async getAllFeedback() {
    return this.prisma.feedback.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getFeedbackById(id: string) {

    const feedback = await this.prisma.feedback.findUnique({
      where: { id },
    });

    if (!feedback) {
      throw new NotFoundException('Feedback not found');
    }

    return feedback;
  }

  async updateFeedback(id: string, dto: UpdateFeedbackDto){
      
    const existingFeedback = await this.prisma.feedback.findUnique({
      where: { id },
    });

    if (!existingFeedback) {
      throw new NotFoundException('Feedback not found');
    }

    return this.prisma.feedback.update({
      where: { id },
      data: dto,
    });
  }

  async deleteFeedback(id: string){

    const feedback = await this.prisma.feedback.findUnique({
      where: { id },
    });

    if (!feedback) {
      throw new NotFoundException('Feedback not found');
    }

    await this.prisma.feedback.delete({
      where: { id },
    });

    return {
      success: true,
      message: "Feedback deleted successfully",
    };

  }


}
