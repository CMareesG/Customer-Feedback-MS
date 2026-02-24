import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsOptional,
  IsEnum,
} from 'class-validator';

export enum Role {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
}

export class CreateUserDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password!: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
