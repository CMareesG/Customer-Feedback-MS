import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {

  private products:CreateProductDto[]=[];
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto,file:Express.Multer.File) {
    const fileUrl = `http://localhost:3000/uploads/${file.filename}`; 
        
    const product = {
      name:createProductDto.name,
      description:createProductDto.description,
      subCategoryId:Number(createProductDto.subCategoryId),
      img:fileUrl
    }
    
    return await this.prisma.product.create({data:product});
  }

  async findAll() {
    return await this.prisma.product.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {

    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
