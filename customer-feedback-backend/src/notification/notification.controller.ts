import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.createNotification(createNotificationDto);
  }

  @Get()
  findAll() {
    return this.notificationService.getAllNotification();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationService.getNotificationById(id);
  }

  @Get("user/:id")
  findAllByUser(@Param('id') id: string) {
    return this.notificationService.getNotificationByUserId(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationService.updateNotification(
      id,
      updateNotificationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationService.deleteNotification(id);
  }
}
