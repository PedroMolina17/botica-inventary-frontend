import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  getAllProducts,
  deleteProduct,
  createProduct,
  getProductByName,
  getProductById,
  updateProduct,
} from "../services/product";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const useGetAllProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
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
      queryClient.invalidateQueries({ queryKey: ["products"] });
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
      queryClient.invalidateQueries({ queryKey: ["products"] });
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
};
