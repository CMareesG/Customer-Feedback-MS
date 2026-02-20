import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ResponseService {
  constructor(private prisma: PrismaService) {}

  async create(feedbackId: string, message: string) {
    const adminId = "admin-456"; // Use the ID from your test data

    // 1️⃣ Check if feedback exists
    const feedback = await this.prisma.feedback.findUnique({
      where: { id: feedbackId },
    });

    if (!feedback) {
      throw new NotFoundException('Feedback not found');
    }

    // 2️⃣ Check if admin exists
    const admin = await this.prisma.user.findUnique({
      where: { id: adminId },
    });

    if (!admin) {
      throw new NotFoundException('Admin user not found');
    }

    // 3️⃣ Create response
    return this.prisma.response.create({
      data: {
        message,
        feedbackId,
        adminId,
      },
    });
  }
}
