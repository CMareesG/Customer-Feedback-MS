import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateResponseDto {
  @IsString()
  @IsNotEmpty()
  feedbackId: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  message: string;
}
