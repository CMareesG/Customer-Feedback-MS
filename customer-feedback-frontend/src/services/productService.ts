import { api } from "./api";

export async function fetchProductByCategoryId(categoryId:string){
    const response = await api.get(`/products/category/${categoryId}`);
    return response.data;
}

export async function fetchProductById(productId:string){
    const response = await api.get(`/products/${productId}`);
    return response.data;
}