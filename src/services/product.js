import axiosInstance from "../../config/api";

export const getAllProducts = async () => {
  const { data } = await axiosInstance.get("/product");
  return data;
};

export const deleteProduct = async (id) => {
  await axiosInstance.delete(`/product/${id}`);
};

export const updateProduct = async (id, data) => {
  await axiosInstance.patch(`/product/${id}`, data);
};

export const createProduct = async (product) => {
  const response = await axiosInstance.post("/product", product);
  return response.data;
};

export const getProductByName = async (name) => {
  const { data } = await axiosInstance.get(`/product/search?name=${name}`);
  return data;
};

export const getProductById = async (id) => {
  const { data } = await axiosInstance.get(`/product/${id}`);
  return data;
};
