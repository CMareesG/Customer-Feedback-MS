import { api } from "./api";

export const loginUser = async (
    email: string,
    password: string
  ) => {
  
    const response = await api.post(
      "/user/login",
      {
        email,
        password,
      }
    );
  
    return response.data;
  };
export const logout = async (
  refreshToken: string
) => {
  const response = await api.post(
    "user/logout",{
      refreshToken
    },
    {
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem(
            "accessToken"
          )}`,
      },
    }
  );
  // console.log("logout service",response.data);
  return response.data;
}