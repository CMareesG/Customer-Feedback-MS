import type { AxiosResponse } from "axios";
import { api } from "./api";
import type { user } from "../types/user";

export const getUser = async (): Promise<user> => {
  const response: AxiosResponse<user> = await api.get("user/me",{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    },);
  return response.data;
};

// alias for clarity elsewhere in the codebase
export const getCurrentUser = getUser;
