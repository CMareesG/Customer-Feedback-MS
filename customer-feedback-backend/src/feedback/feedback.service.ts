import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Feedback } from '@prisma/client';

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) {}

  async createFeedback(dto: CreateFeedbackDto) {
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

  async getDashboardStats(userId: string) {
    // total feedback given by user
    const totalFeedback = await this.prisma.feedback.count({
      where: { userId },
    });

    // resolved feedback count (feedback having at least one response)
    const resolvedFeedback = await this.prisma.feedback.count({
      where: {
        userId,
        responses: {
          some: {},
        },
      },
    });

    // pending feedback count (feedback having no response)
    const pendingFeedback = await this.prisma.feedback.count({
      where: {
        userId,
        responses: {
          none: {},
        },
      },
    });

    // average rating
    const avgResult = await this.prisma.feedback.aggregate({
      where: { userId },
      _avg: {
        rating: true,
      },
    });

    const averageRating = avgResult._avg.rating ?? 0;

    return {
      totalFeedback,
      resolvedFeedback,
      pendingFeedback,
      averageRating: Number(averageRating.toFixed(1)),
    };
  }

  async getRecentFeedback(userId: string) {
    return this.prisma.feedback.findMany({
      where: { userId },

      select: {
        id: true,

        rating: true,

        review: true,

        createdAt: true,

        product: {
          select: {
            name: true,
          },
        },

        responses: {
          select: {
            id: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },

      take: 5,
    });
  }

  async updateFeedback(id: string, dto: UpdateFeedbackDto) {
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

  async deleteFeedback(id: string) {
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
      message: 'Feedback deleted successfully',
    };
  }

  async getFeedbackByProductId(productId:string):Promise<Feedback[]>{
    return await this.prisma.feedback.findMany({where:{productId}});
  }
}
