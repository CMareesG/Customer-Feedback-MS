import { api } from "./api";

export const getDashboardStats = async () => {

  const res = await api.get(
    "/feedback/user/dashboard-stats",
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


export const getRecentFeedback = async () => {

  const res = await api.get(
    "/feedback/user/recent",
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