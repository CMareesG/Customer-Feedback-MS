import type { AxiosResponse } from "axios";
import { api } from "./api";
import type { feedback } from '../types/feedback';

export const getFeedbackByProduct = async (productId:string):Promise<feedback[]> => {
  const response:AxiosResponse = await api.get(`/feedback/product/${productId}`);
  return response.data;
};