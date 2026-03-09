import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ResponseService } from './response.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/user/strategy/roles.guard';
import { Role } from '@prisma/client';
import { Roles } from 'src/user/roles.decorator';

@Controller('response')
@UseGuards(AuthGuard("jwt"),RolesGuard)
export class ResponseController {
  constructor(private responseService: ResponseService) {}

  @Post()
  @Roles(Role.ADMIN)
  createResponse(@Body() dto: CreateResponseDto) {
    return this.responseService.createResponse(dto);
  }

  @Get()
  @Roles(Role.ADMIN)
  getAllResponse() {
    return this.responseService.getAllResponse();
  }

  @Get(':id')
  @Roles(Role.ADMIN,Role.CUSTOMER)
  getResponseById(@Param('id') id: string) {
    return this.responseService.getResponseById(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  updateResponse(@Param('id') id: string, @Body() dto: UpdateResponseDto) {
    return this.responseService.updateResponse(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  deleteResponse(@Param('id') id: string) {
    return this.responseService.deleteResponse(id);
  }
}
