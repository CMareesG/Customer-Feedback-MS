import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Min, MinLength, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer'; 

 
export class CreateCategoryDto { 
     
    @IsString() 
    @MinLength(3) 
    name!:string; 

    @IsString()
    @MinLength(3)
    slug?:string

    @IsOptional()
    @IsString()
    description?:string

    @IsOptional()
    @IsString()
    parentId?:string

    @IsOptional()
    @IsBoolean()
    isActive?:boolean

    @IsOptional()
    @IsInt()
    sortOrder?:number;
}