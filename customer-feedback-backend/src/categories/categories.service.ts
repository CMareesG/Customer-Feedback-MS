import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import slugify from 'slugify';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCategoryDto) {

    if (dto.parentId) {
      const parentFound = await this.prisma.category.findUnique({
        where: { id: dto.parentId },
      });

      if (!parentFound) {
        throw new BadRequestException('Parent category not found');
      }
    }
    
    const slug = slugify(dto.name, { lower: true });

    
    const existingSlug = await this.prisma.category.findUnique({
      where: { slug },
    });

    if (existingSlug) {
      throw new BadRequestException('Category with this name already exists');
    }

    return this.prisma.category.create({
      data: {
        name: dto.name,
        slug,
        description: dto.description,
        isActive: dto.isActive ?? true,
        sortOrder: dto.sortOrder ?? 0,
        ...(dto.parentId && {
          parent: {
            connect: { id: dto.parentId },
          },
        }),
      },
    });
  }

  async findAll() {
    return this.prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { children: true },
    });

    if (!category) {
      throw new BadRequestException('Category not found');
    }

    return category;
  }

  async update(id: string, dto: UpdateCategoryDto) {

    const category = await this.findOne(id);

    if (dto.parentId && dto.parentId === id) {
      throw new BadRequestException('Category cannot be its own parent');
    }

    const data: any = {
      name: dto.name,
      description: dto.description,
      isActive: dto.isActive,
      sortOrder: dto.sortOrder,
    };

    if (dto.name) 
    {
      data.slug = slugify(dto.name, { lower: true });
    }

    if (dto.parentId === null || dto.parentId === '') 
    {
      data.parent = { disconnect: true };
    } 
    else if (dto.parentId) 
    {
      const parent = await this.prisma.category.findUnique({
        where: { id: dto.parentId },
      });
      if (!parent) {
        throw new BadRequestException('Parent category not found');
      }
      data.parent = { connect: { id: dto.parentId } };
    }

    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.category.update({
      where: { id },
      data: { isActive: false },
    });
  }
}