import type { AxiosResponse } from "axios";
import { api } from "./api";
import type { notification } from "../types/notification";

export const getNotificationByUserId = async ():Promise<notification[]> => {
  console.log("Api call for noti get");
  const response:AxiosResponse = await api.get(`/notification/user`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    },);
  return response.data;
};

export const deleteNotificationById = async (notificationId:string):Promise<Notification> =>{
    const response:AxiosResponse = await api.delete(`/notification/${notificationId}`,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    },
    );
    return response.data;
}

export const addNotificationforAdmins = async ():Promise<void> => {
  await api.post(
    "/notification/admin",
    {
      title:"User Feedback",
      message:"A User added a feedback to a product"
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    },
  );
} 

export const addNotificationforUser = async (userId:string): Promise<void> => {
  await api.post(
    "/notification/user",
    {
      title: "Admin Response",
      message: "A User responded to your feedback",
      userId
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    },
  );
}; 