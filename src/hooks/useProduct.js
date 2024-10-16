import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  getAllProducts,
  deleteProduct,
  createProduct,
  getProductByName,
  getProductById,
  updateProduct,
  countProducts,
  countProductsLower,
  countUsers,
} from "../services/product";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const useGetAllProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
  });
};

const useCountProducts = () => {
  return useQuery({
    queryKey: ["productsCount"],
    queryFn: () => countProducts(),
  });
};

const useCountProductsLower = () => {
  return useQuery({
    queryKey: ["productsLower"],
    queryFn: () => countProductsLower(),
  });
};

const useCountUsers = () => {
  return useQuery({
    queryKey: ["usersCount"],
    queryFn: () => countUsers(),
  });
};

const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId) => deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    },
  });
};

const useCreateProduct = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product) => createProduct(product),
    onSuccess: () => {
      navigate("/admin/products");
      queryClient.invalidateQueries({ queryKey: ["products", "imageCover"] });
    },
  });
};

const useGetProductByName = (name) => {
  return useQuery({
    queryKey: ["product"],
    queryFn: () => getProductByName(name),
    enabled: !!name,
  });
};

const useGetProductById = (id) => {
  return useQuery({
    queryKey: ["product"],
    queryFn: () => getProductById(id),
  });
};

const useUpdateProduct = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, product }) => updateProduct(id, product),
    onSuccess: () => {
      navigate("/admin/products");
      queryClient.invalidateQueries({ queryKey: ["products", "imageCover"] });
    },
  });
};

export {
  useGetAllProducts,
  useDeleteProduct,
  useCreateProduct,
  useGetProductByName,
  useGetProductById,
  useUpdateProduct,
  useCountProducts,
  useCountProductsLower,
  useCountUsers,
};
