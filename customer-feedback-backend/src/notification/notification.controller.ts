import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/user/strategy/roles.guard';
import { Role } from '@prisma/client';
import { Roles } from 'src/user/roles.decorator';

@Controller('notification')
@UseGuards(AuthGuard('jwt'),RolesGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.createNotification(createNotificationDto);
  }

  @Get()
  @Roles(Role.ADMIN,Role.CUSTOMER)
  findAll() {
    return this.notificationService.getAllNotification();
  }

  @Get(':id')
  @Roles(Role.ADMIN,Role.CUSTOMER)
  findOne(@Param('id') id: string) {
    return this.notificationService.getNotificationById(id);
  }

  @Get('user/:id')
  @Roles(Role.ADMIN,Role.CUSTOMER)
  findAllByUser(@Param('id') id: string) {
    return this.notificationService.getNotificationByUserId(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationService.updateNotification(
      id,
      updateNotificationDto,
    );
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.notificationService.deleteNotification(id);
  }
}
