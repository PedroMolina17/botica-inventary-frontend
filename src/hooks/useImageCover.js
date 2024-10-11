"use client";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  getAllImageCover,
  createImageCover,
  deleteImageCover,
  updateImageCover,
} from "../services/image-cover";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const useGetAllImageCover = () => {
  return useQuery({
    queryKey: ["imageCover"],
    queryFn: () => getAllImageCover(),
  });
};

const useDeleteImageCover = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (imageCoverId) => deleteImageCover(imageCoverId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["imageCover"] });
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    },
  });
};

const useCreateImageCover = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => createImageCover(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["imageCover", "products"] });
    },
  });
};

const useUpdateImageCover = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }) => updateImageCover(id, formData),
    onSuccess: () => {
      navigate("/admin/products");
      queryClient.invalidateQueries({ queryKey: ["imageCover", "products"] });
    },
  });
};

export {
  useGetAllImageCover,
  useDeleteImageCover,
  useCreateImageCover,
  useUpdateImageCover,
};
