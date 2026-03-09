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

export const getProductById = async  (feedbackId : string) => {
  const res = await api.get(
    `/feedback/${feedbackId}`,
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
}