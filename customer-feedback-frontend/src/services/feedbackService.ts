import type { AxiosResponse } from "axios";
import { api } from "./api";
import type { Feedback } from '../types/feedback';

export const getFeedbackByProduct = async (productId:string):Promise<Feedback[]> => {
  const response:AxiosResponse = await api.get(`/feedback/product/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    },);
  return response.data;
};

export const addFeedbackForProduct = async (rating:number,review:string,productId:string):Promise<Feedback> => {
  const response: AxiosResponse = await api.post(
    `/feedback`,
    {
      productId,
      rating,
      review,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    },
  );
  return response.data;
}