import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Patch,
  Delete,
} from '@nestjs/common';
import { ResponseService } from './response.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';

@Controller('response')
export class ResponseController {
  constructor(private responseService: ResponseService) {}

  @Post()
  createResponse(@Body() dto: CreateResponseDto) {
    return this.responseService.createResponse(dto);
  }

  @Get()
  getAllResponse() {
    return this.responseService.getAllResponse();
  }

  @Get(':id')
  getResponseById(@Param('id') id: string) {
    return this.responseService.getResponseById(id);
  }

  @Patch(':id')
  updateResponse(@Param('id') id: string, @Body() dto: UpdateResponseDto) {
    return this.responseService.updateResponse(id, dto);
  }

  @Delete(':id')
  deleteResponse(@Param('id') id: string) {
    return this.responseService.deleteResponse(id);
  }
}
