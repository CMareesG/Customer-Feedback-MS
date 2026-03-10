import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/user/strategy/roles.guard';
import { Role } from '@prisma/client';
import { Roles } from 'src/user/roles.decorator';

@Controller('notification')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // @Post()
  // @Roles(Role.ADMIN)
  // create(@Body() createNotificationDto: CreateNotificationDto) {
  //   return this.notificationService.createNotification(createNotificationDto);
  // }

  @Post('user')
  @Roles(Role.ADMIN)
  addNotificationForUser(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.createNotification(createNotificationDto);
  }

  @Post('admin')
  @Roles(Role.CUSTOMER)
  addNotificationForAdmins(
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    return this.notificationService.createNotificationForAdmins(
      createNotificationDto,
    );
  }

  @Get()
  @Roles(Role.ADMIN, Role.CUSTOMER)
  findAll() {
    return this.notificationService.getAllNotification();
  }

  @Get('user')
  @Roles(Role.ADMIN, Role.CUSTOMER)
  findAllByUser(@Req() req) {
    console.log('get notification:', req.user.id);
    return this.notificationService.getNotificationByUserId(req.user.id);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.CUSTOMER)
  findOne(@Param('id') id: string) {
    return this.notificationService.getNotificationById(id);
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
  @Roles(Role.CUSTOMER, Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.notificationService.deleteNotification(id);
  }
}
