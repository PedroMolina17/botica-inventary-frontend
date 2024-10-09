import axiosInstance from "../../config/api";

export const getAllCategories = async () => {
  const { data } = await axiosInstance.get("/category");
  return data;
};

export const deleteCategories = async (id) => {
  await axiosInstance.delete(`/category/${id}`);
};

export const updateCategories = async (id, data) => {
  await axiosInstance.patch(`/category/${id}`, data);
};

export const createCategories = async (Categorie) => {
  const response = await axiosInstance.post("/category", Categorie);
  return response.data;
};

export const CategoriesById = async (id) => {
  const { data } = await axiosInstance.get(`/category/${id}`);
  return data;
};
