export class ResponseCategoryDto {
  id!: string;
  name!: string;
  slug!: string;
  description?: string;
  parentId?: string;
  isActive!: boolean;
  sortOrder!: number;
  createdAtTime!: Date;
  updatedAtTime!: Date;
  children?: ResponseCategoryDto[];
}
