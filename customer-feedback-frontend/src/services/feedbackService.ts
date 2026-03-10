import type { AxiosResponse } from "axios";
import { api } from "./api";
import type { Feedback } from '../types/feedback';

export const getFeedbackByProduct = async (productId:string):Promise<Feedback[]> => {
  const response:AxiosResponse = await api.get(`/feedback/product/${productId}`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
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

export const getFeedbackByUser = async () => {

  const res = await api.get(
    "/feedback/user",
    {
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem(
            "accessToken"
          )}`,
      },
    }
  );


  return res.data;
};


export const getUserFeedbackForProduct = async (productId:string):Promise<Feedback | null> => {
  const response: AxiosResponse = await api.get(`/feedback/user/product/${productId}`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};

export const updateFeedback = async (feedbackId:number,rating:number,review:string):Promise<Feedback> => {
  const response: AxiosResponse = await api.patch(
    `/feedback/${feedbackId}`,
    {
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
};

