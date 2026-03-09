import { Product } from '@prisma/client';

export type productExtension = {
  rating: number;
  review: number;
};

export type ExtendedProduct = Product & productExtension;
