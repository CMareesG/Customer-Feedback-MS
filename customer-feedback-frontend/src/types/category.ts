export type category = {
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  isActive?: boolean;
  id:string;
};

export type categoryStatus = {
    name:string;
    slug:string;
    id:string
    isOpen:boolean;
}