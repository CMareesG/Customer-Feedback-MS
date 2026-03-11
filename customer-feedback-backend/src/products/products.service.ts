import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Feedback, Product } from '@prisma/client';
import { FeedbackService } from 'src/feedback/feedback.service';
import { ExtendedProduct } from 'src/types/product';
import { uploadImage, deleteImage } from 'src/utils/azureupload';

@Injectable()
export class ProductsService {
  private products: CreateProductDto[] = [];
  constructor(private prisma: PrismaService, private feedbackService: FeedbackService) { }

  async create(
    createProductDto: CreateProductDto,
    file: Express.Multer.File,
  ): Promise<object> {
    if (!file) {
      throw new Error('File is required');
    }

    const imageUrl = await uploadImage(file);

    const product: CreateProductDto = {
      name: createProductDto.name,
      description: createProductDto.description,
      categoryId: createProductDto.categoryId,
      img: imageUrl,
    };

    return await this.prisma.product.create({ data: product });
  }

  async findAll(): Promise<object> {
    return await this.prisma.product.findMany();
  }

  async findAllByCategory(categoryId: string): Promise<ExtendedProduct[]> {
    const products = await this.prisma.product.findMany({
      where: { categoryId },
    });
    const fproducts: ExtendedProduct[] = await Promise.all(products.map(async (product) => {
      const feedbacks: Feedback[] = await this.feedbackService.getFeedbackByProductId(product.id);
      const review: number = feedbacks.length;
      return {
        ...product,
        rating: review > 0 ? feedbacks.reduce((rating: number, feedback: Feedback) => {
          return rating + feedback.rating;
        }, 0) / review : 0,
        review
      };
    }));
    return fproducts;
  }

  async findOne(id: string): Promise<object> {
    const product: Product | null = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
    file: Express.Multer.File,
  ): Promise<object> {
    const existingProduct: Product | null =
      await this.prisma.product.findUnique({
        where: { id },
      });
    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    const data: UpdateProductDto = {
      ...existingProduct,
      ...updateProductDto,
    };

    if (file) {
      await deleteImage(existingProduct.img);
      const imageUrl = await uploadImage(file);
      data.img = imageUrl;
    }
    return await this.prisma.product.update({ data, where: { id } });
  }

  async remove(id: string): Promise<object> {
    const product: Product | null = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) throw new NotFoundException('Product not found');
    await deleteImage(product.img);
    await this.prisma.product.delete({ where: { id } });
    return {
      success: true,
      message: 'Product deleted successfully',
    };
  }
}
