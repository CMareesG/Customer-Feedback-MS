import { Type } from "class-transformer";
import { MinLength } from "class-validator";


export class CreateFeedbackDto {
  productId: string;
  userId: string;
  rating: number;
  review: string;
}
