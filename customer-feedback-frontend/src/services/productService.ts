import { api } from "./api";

export async function fetchProductByCategoryId(categoryId:string){
    const response = await api.get(`/products/category/${categoryId}`,{
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem(
            "accessToken"
          )}`,
      },
    });
    return response.data;
}

export async function fetchProductById(productId:string){
    const response = await api.get(`/products/${productId}`,{
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem(
            "accessToken"
          )}`,
      },
    });
    return response.data;
}