import { api } from "./api";



export const getAllCategories = async () => {
  const response = await api.get("/categories",{
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem(
            "accessToken"
          )}`,
      },
    });
  return response.data;
};

export const createCategory = async (data: {
  name: string;
  description?: string;
  parentId?: string;
}) => {
  const response = await api.post("/categories", data,{
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem(
            "accessToken"
          )}`,
      },
    });
  return response.data;
};

export const updateCategory = async (
  id: string,
  data: {
    name: string;
    description?: string;
    parentId?: string;
  }
) => {
  const response = await api.patch(`/categories/${id}`, data,{
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem(
            "accessToken"
          )}`,
      },
    });
  return response.data;
};

export const deleteCategory = async (id: string) => {
  const response = await api.delete(`/categories/${id}`,{
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem(
            "accessToken"
          )}`,
      },
    });
  return response.data;
};


export const getAllUsers = async () => {
  const response = await api.get("/user/all",{
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem(
            "accessToken"
          )}`,
      },
    });
  return response.data;
};

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "ADMIN";
}) => {
  const response = await api.post("/user/create", data,{
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem(
            "accessToken"
          )}`,
      },
    });
  return response.data;
};

export const updateUser = async (
  id: string,
  data: {
    name: string;
    email: string;
    password?: string;
    role: "CUSTOMER" | "ADMIN";
  }
) => {
  const response = await api.patch(`/user/${id}`,data,{
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem(
            "accessToken"
          )}`,
      },
    });
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/user/${id}`,{
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem(
            "accessToken"
          )}`,
      },
    });
  return response.data;
};



export const getAllProducts = async () => {
  const response = await api.get("/products",{
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem(
            "accessToken"
          )}`,
      },
  });
  return response.data;
};

export const getProductsByCategory = async (categoryId: string) => {
  const response = await api.get("/products",{
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem(
            "accessToken"
          )}`,
      },
    });
  const allProducts = response.data;
  return allProducts.filter(
    (product: { categoryId: string }) => product.categoryId === categoryId
  );
};

export const createProduct = async (formData: FormData) => {
  const response = await api.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      
      Authorization:
          `Bearer ${localStorage.getItem(
            "accessToken"
          )}`,
        }
  });
  return response.data;
};

export const updateProduct = async (id: string, formData: FormData) => {
  const response = await api.patch(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization:
          `Bearer ${localStorage.getItem(
            "accessToken"
          )}`,
    },
  });
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/products/${id}`,{
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem(
            "accessToken"
          )}`,
      },
    });
  return response.data;
};


export const getFeedbackByProduct = async (productId: string) => {
  const response = await api.get("/feedback",{
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem(
            "accessToken"
          )}`,
      },
    });
  const allFeedback = response.data;
  return allFeedback.filter(
    (feedback: { productId: string }) => feedback.productId === productId
  );
};

export const getAllFeedback = async () => {
  const response = await api.get("/feedback",{
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem(
            "accessToken"
          )}`,
      },
    });
  return response.data;
};

export const updateFeedback = async (
  id: string,
  data: {
    rating: number;
    review: string;
  }
) => {
  const response = await api.patch(`/feedback/${id}`, data,{
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem(
            "accessToken"
          )}`,
      },
    });
  return response.data;
};

export const deleteFeedback = async (id: string) => {
  const response = await api.delete(`/feedback/${id}`,{
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem(
            "accessToken"
          )}`,
      },
    });
  return response.data;
};



export const createResponse = async (data: {
  feedbackId: string;
  response: string;
  userId: string;
}) => {
  const response = await api.post("/response", data,{
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem(
            "accessToken"
          )}`,
      },
    });
  return response.data;
};

export const getAllResponses = async () => {
  const response = await api.get("/response",{
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem(
            "accessToken"
          )}`,
      },
    });
  return response.data;
};

export const updateResponse = async (
  id: string,
  data: {
    response: string;
  }
) => {
  const response = await api.patch(`/response/${id}`, data,{
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem(
            "accessToken"
          )}`,
      },
    });
  return response.data;
};

export const deleteResponse = async (id: string) => {
  const response = await api.delete(`/response/${id}`,{
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem(
            "accessToken"
          )}`,
      },
    });
  return response.data;
};

