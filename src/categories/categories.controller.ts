import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ResponseCategoryDto } from './dto/response-category.dto';
import { CategoriesService } from './categories.service';
@Controller('categories')
export class CategoriesController 
{
    constructor(private category:CategoriesService){}

    @Post()
    create(@Body() dto:CreateCategoryDto)
    {
        return this.category.Create(dto);
    }

    @Get()
    findAll()
    {
        return this.category.findAll();
    }

    @Get(':id')
    findOne(@Param('id',ParseUUIDPipe) id:string)
    {
        return this.category.findOne(id);
    }

    @Patch(':id')
    update(@Param('id',ParseUUIDPipe) id:string,@Body() dto:UpdateCategoryDto)
    {
        return this.category.update(id,dto);

    }

    @Delete(':id')
    remove(@Param('id',ParseUUIDPipe) id:string)
    {
        return this.category.remove(id);
    }
    
}
