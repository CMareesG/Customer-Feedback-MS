import { api } from "./api";

export async function fetchProductByCategoryId(categoryId:string){
    const response = await api.get(`/products/category/${categoryId}`);
    return response.data;
}