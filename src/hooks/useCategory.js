import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  getAllCategories,
  CategoriesById,
  createCategories,
  updateCategories,
  deleteCategories,
} from "../services/category";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const useGetAllCategory = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: () => getAllCategories(),
  });
};

const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId) => deleteCategories(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    },
  });
};

const useCreateCategory = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product) => createCategories(product),
    onSuccess: () => {
      navigate("/admin/category");
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
};

const useGetCategoryById = (id) => {
  return useQuery({
    queryKey: ["category"],
    queryFn: () => CategoriesById(id),
  });
};

const useUpdateCategory = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, product }) => updateCategories(id, product),
    onSuccess: () => {
      navigate("/admin/category");
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
};

export {
  useGetAllCategory,
  useDeleteCategory,
  useCreateCategory,
  useGetCategoryById,
  useUpdateCategory,
};
