import type { AxiosResponse } from "axios";
import type { category } from "../types/category";
import { api } from "./api";

export const getCategories = async ():Promise<category[]> => {
  const response:AxiosResponse = await api.get("/categories");
  return response.data;
};
