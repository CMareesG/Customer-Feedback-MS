import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateProductDto {
    @IsString()
    @MinLength(2)
    @IsNotEmpty()
    name:string;

    @IsString()
    @MinLength(2)
    description:string;

    @IsOptional()
    @IsString()
    img?:string;

    @IsNotEmpty()
    subCategoryId:number;
}
