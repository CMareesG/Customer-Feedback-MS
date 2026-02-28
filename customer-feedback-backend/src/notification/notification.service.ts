import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async createNotification(dto: CreateNotificationDto) {
    await this.isUserExist(dto.userId)
    return this.prisma.notification.create({
      data: dto,
    });
  }

  async getAllNotification() {
    return this.prisma.notification.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getNotificationById(id: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    return notification;
  }
  async getNotificationByUserId(id: string) {
    await this.isUserExist(id);
    const notifications = await this.prisma.notification.findMany({
      where: { userId: id },
    });

    if (!notifications) {
      throw new NotFoundException('Notifications not found');
    }

    return notifications;
  }

  async updateNotification(id: string, dto: UpdateNotificationDto) {
    const existingNotification = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (!existingNotification) {
      throw new NotFoundException('Notification not found');
    }

    return this.prisma.notification.update({
      where: { id },
      data: dto,
    });
  }

  async deleteNotification(id: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    await this.prisma.notification.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'Notification deleted successfully',
    };
  }

  async isUserExist(userId: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if(!user)
      throw new NotFoundException('User not found');
  }
}
