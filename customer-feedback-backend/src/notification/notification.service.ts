import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Notification, User } from '@prisma/client';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async createNotification(dto: CreateNotificationDto) {
    // await this.isUserExist(dto.userId);
    return this.prisma.notification.create({
      data: dto,
    });
  }

  async createNotificationForAdmins(dto: CreateNotificationDto):Promise<Notification[]> {
    // await this.isUserExist(dto.userId);
    const admins:User[] = await this.prisma.user.findMany({where:{role:"ADMIN"}});
    return Promise.all(
      admins.map(
        async (admin) =>
          await this.prisma.notification.create({
            data: {
              ...dto,
              userId: admin.id,
            },
          }),
      ),
    );
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
      where: {
        userId: id,
        isRead: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
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
    return await this.updateNotification(id, { isRead: true });
    //   const notification = await this.prisma.notification.findUnique({
    //     where: { id },
    //   });

    //   if (!notification) {
    //     throw new NotFoundException('Notification not found');
    //   }

    //   await this.prisma.notification.delete({
    //     where: { id },
    //   });

    //   return {
    //     success: true,
    //     message: 'Notification deleted successfully',
    //   };
  }

  async isUserExist(userId: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
  }
}
