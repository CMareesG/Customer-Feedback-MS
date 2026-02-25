import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ResponseService {
  constructor(private prisma: PrismaService) {}

  async createResponse(dto: CreateResponseDto) {
    
    const admin = await this.prisma.user.findUnique({
      where: { id: dto.adminId },
    });
    if (!admin) throw new NotFoundException('admin not found');

    const feedback = await this.prisma.feedback.findUnique({
      where: { id: dto.feedbackId },
    });
    if (!feedback) throw new NotFoundException('feedback not found');
    return this.prisma.response.create({
      data: dto,
    });
  }

  async getAllResponse() {
    return this.prisma.response.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getResponseById(id: string) {
    const response = await this.prisma.response.findUnique({
      where: { id },
    });

    if (!response) {
      throw new NotFoundException('Response not found');
    }

    return response;
  }

  async updateResponse(id: string, dto: UpdateResponseDto) {
    const existingResponse = await this.prisma.response.findUnique({
      where: { id },
    });

    if (!existingResponse) {
      throw new NotFoundException('Response not found');
    }

    return this.prisma.response.update({
      where: { id },
      data: dto,
    });
  }

  async deleteResponse(id: string) {
    const response = await this.prisma.response.findUnique({
      where: { id },
    });

    if (!response) {
      throw new NotFoundException('Response not found');
    }

    await this.prisma.response.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'Response deleted successfully',
    };
  }
}
