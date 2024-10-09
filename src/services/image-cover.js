import axiosInstance from "../../config/api";

export const getAllImageCover = async () => {
  const { data } = await axiosInstance.get("/image");
  return data;
};

export const deleteImageCover = async (id) => {
  await axiosInstance.delete(`/image/${id}`);
};

export const updateImageCover = async (id, formData) => {
  await axiosInstance.patch(`/image/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const createImageCover = async (formData) => {
  const response = await axiosInstance.post("/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
