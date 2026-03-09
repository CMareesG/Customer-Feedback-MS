import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Product, Role } from '@prisma/client';
import { ExtendedProduct } from 'src/types/product';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/user/strategy/roles.guard';
import { Roles } from 'src/user/roles.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(AuthGuard("jwt"),RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(createProductDto, file);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @UseGuards(AuthGuard("jwt"),RolesGuard)
  @Get(':id')
  @Roles(Role.ADMIN,Role.CUSTOMER)
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @UseGuards(AuthGuard("jwt"),RolesGuard)
  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productsService.update(id, updateProductDto, file);
  }

  @UseGuards(AuthGuard("jwt"),RolesGuard)
  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string):Promise<object> {
    return this.productsService.remove(id);
  }

  @UseGuards(AuthGuard("jwt"),RolesGuard)
  @Get('category/:categoryId')
  @Roles(Role.ADMIN,Role.CUSTOMER)
  async findAllByCategory(@Param('categoryId') categoryId:string):Promise<ExtendedProduct[]>{
    return await this.productsService.findAllByCategory(categoryId);
  }
}
