import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Feedback, User } from '@prisma/client';
import { extendedFeedback } from 'src/types/feedback';

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) { }

  async createFeedback(dto: CreateFeedbackDto,userId:string): Promise<extendedFeedback> {
    console.log("feedback",userId);
    const feedback =  await this.prisma.feedback.create({
      data: {
        productId: dto.productId,
        userId,
        rating: dto.rating,
        review: dto.review,
      },
    });
    const user: User | null = await this.prisma.user.findUnique({
      where: { id: feedback.userId },
    });
    if (!user) throw new NotFoundException('User not found');
    return {
      ...feedback,
      name: user.name,
    };
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
    const totalFeedback = await this.prisma.feedback.count({
      where: { userId },
    });

    const resolvedFeedback = await this.prisma.feedback.count({
      where: {
        userId,
        responses: {
          some: {},
        },
      },
    });

    const pendingFeedback = await this.prisma.feedback.count({
      where: {
        userId,
        responses: {
          none: {},
        },
      },
    });

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

  async getFeedbackByProductId(productId: string): Promise<extendedFeedback[]> {
    const response: Feedback[] = await this.prisma.feedback.findMany({ where: { productId } });
    const feedbacks: Promise<extendedFeedback[]> = Promise.all(response.map(async (feedback:Feedback):Promise<extendedFeedback> => {
      const user: User | null = await this.prisma.user.findUnique({ where: { id: feedback.userId } });
      if (!user) throw new NotFoundException('User not found');
      return {
        ...feedback,
        name: user.name
      }
    }))
    return feedbacks;
  }

  async getUserFeedbackForProduct(userId: string, productId: string): Promise<extendedFeedback | null> {
    const feedback = await this.prisma.feedback.findFirst({
      where: {
        userId,
        productId,
      },
    });

    if (!feedback) {
      return null;
    }

    const user: User | null = await this.prisma.user.findUnique({
      where: { id: feedback.userId },
    });

    if (!user) throw new NotFoundException('User not found');

    return {
      ...feedback,
      name: user.name,
    };
  }
}

