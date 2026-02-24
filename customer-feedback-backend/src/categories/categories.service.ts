import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import slugify from 'slugify';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCategoryDto) {
    // Validate parent
    if (dto.parentId) {
      const parentFound = await this.prisma.category.findUnique({
        where: { id: dto.parentId },
      });

      if (!parentFound) {
        throw new BadRequestException('Parent category not found');
      }
    }

    // Generate slug
    const slug = slugify(dto.name, { lower: true });

    // Check duplicate slug
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

    // Prevent self-parenting
    if (dto.parentId && dto.parentId === id) {
      throw new BadRequestException('Category cannot be its own parent');
    }

    // Validate new parent
    if (dto.parentId) {
      const parent = await this.prisma.category.findUnique({
        where: { id: dto.parentId },
      });

      if (!parent) {
        throw new BadRequestException('Parent category not found');
      }
    }

    // If name updated, regenerate slug
    let slug;
    if (dto.name) {
      slug = slugify(dto.name, { lower: true });
    }

    return this.prisma.category.update({
      where: { id },
      data: {
        ...dto,
        ...(slug && { slug }),
      },
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