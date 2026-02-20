import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCategoryDto} from './dto/update-category.dto';
import { Category } from '../../generated/prisma/client'
import slugify from 'slugify';

@Injectable()
export class CategoriesService {
    constructor(private readonly prisma:PrismaService){}

    async Create(dto:CreateCategoryDto)
    {
        // const parentFound:Category|null;
        if(dto.parentId)
        {
            const parentFound=await this.prisma.category.findUnique({
                where:{id:dto.parentId}
            })

            if(!parentFound)
            {
                throw new BadRequestException('Category Not Found with this Id');
            }
        }

        const slug=slugify(dto.name,{
            lower:true,
        })

        return this.prisma.category.create({
            data:{
                name:dto.name,
                slug,
                description:dto.description,
                isActive:dto.isActive,
                sortOrder:dto.sortOrder,

                ...(dto.parentId &&{
                    parent:{
                        connect:{id:dto.parentId}
                    },
                }),
            },
        });
    }

    async findAll()
    {
        return this.prisma.category.findMany({
            orderBy:{sortOrder:'asc'}
        });
    }

    async findOne(id:string)
    {
        const category=await this.prisma.category.findUnique({
            where:{id},
            include:{children:true}
        });

        if(!category)
        {
            throw new BadRequestException('No Category is found');
        }

        return category;
    }

    async update(id:string,dto:UpdateCategoryDto)
    {
        const category=this.findOne(id);

        if(!category)
        {
            throw new BadRequestException('No category is found');
        }

        if(dto.parentId && dto.parentId==id)
        {
            throw new BadRequestException('Category Cannot its own parent');
        }

        return this.prisma.category.update({
            where:{id},
            data:dto,
        })
    }

    async remove(id:string)
    {
        const category=this.findOne(id);
        if(!category)
        {
            throw new BadRequestException('No category is found');
        }

        return this.prisma.category.update({
            where:{id},
            data:{isActive:false}
        })
    }
}
