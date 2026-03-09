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