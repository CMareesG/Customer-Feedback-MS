import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { join } from 'path';
import * as fs from 'fs/promises';
import { Product } from 'generated/prisma/client';

@Injectable()
export class ProductsService {

  private products:CreateProductDto[]=[];
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto,file:Express.Multer.File):Promise<object> {
    const fileUrl:string = `http://localhost:3000/uploads/${file.filename}`; 
        
    const product:CreateProductDto = {
      name:createProductDto.name,
      description:createProductDto.description,
      categoryId:createProductDto.categoryId,
      img:fileUrl
    }
    
    return await this.prisma.product.create({data:product});
  }

  async findAll():Promise<object> {
    return await this.prisma.product.findMany();
  }

  async findOne(id: string):Promise<object> {
    const product:Product|null =await this.prisma.product.findUnique({where:{id}});
    if(!product)
      throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto, file:Express.Multer.File):Promise<object> {
    const existingProduct:Product|null = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }
    
    const data:UpdateProductDto={
      ...existingProduct,
      ...updateProductDto
    }
    
    if(file){
      await this.deleteImage(existingProduct.img);
      data.img=`http://localhost:3000/uploads/${file?.filename}`;
    }
    return await this.prisma.product.update({data,where:{id}});
  }

  async remove(id: string):Promise<object> {
    const product:Product|null=await this.prisma.product.findUnique({where:{id}})
    if(!product)
      throw new NotFoundException('Product not found');
    await this.deleteImage(product.img);
    await this.prisma.product.delete({where:{id}})
    return {
      success: true,
      message: "Product deleted successfully",
    };
  }
  async deleteImage(fileurl:string):Promise<void>{
    try{
      const filename:string=fileurl.split("/")[4];
      const filePath:string = join(process.cwd(), 'uploads', filename);
      await fs.access(filePath); 
      await fs.unlink(filePath);
    }catch(error){
      console.log("while handling seeders product image, there is no image to handle in uploads");
    }
  }
}
