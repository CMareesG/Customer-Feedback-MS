import axios from "axios";
 
export const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});
// endpoints that DON'T require token
const publicRoutes = [
  "/"
];
 
api.interceptors.request.use(
  (config) => {
 
    const token = localStorage.getItem("accessToken");
 
    const isPublic = publicRoutes.some((route) =>
      config.url?.includes(route)
    );
 
    if (!isPublic && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
 
    return config;
  },
  (error) => Promise.reject(error)
);
 
api.interceptors.response.use(
  (response) => response,
  (error) => {
 
    if (error.response?.status === 401) {
      //localStorage.removeItem("accessToken");
      //window.location.href = "/";
    }
 
    return Promise.reject(error);
  }
);
 