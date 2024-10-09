import { useForm } from "react-hook-form";
import { useUpdateProduct, useGetProductById } from "../../hooks/useProduct";
import { useUpdateImageCover } from "../../hooks/useImageCover";
import { useGetAllCategory } from "../../hooks/useCategory";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EditProduct = () => {
  const { id } = useParams();
  const { data: product, isLoading: loadingProduct } = useGetProductById(id);
  const mutateProduct = useUpdateProduct();
  const mutateImageCover = useUpdateImageCover();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { data: categories, isLoading, error } = useGetAllCategory();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      stock: "",
      categoryId: "",
    },
  });

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("price", product.price);
      setValue("stock", product.stock);
      setValue("categoryId", product.categoryId);

      if (product.images && product.images.length > 0) {
        setImagePreview(`http://localhost:3000${product.images[0].name}`);
      }
    }
  }, [product, setValue]);

  const onSubmit = async (data) => {
    try {
      const updates = {};

      if (data.name !== product.name) updates.name = data.name;
      if (parseFloat(data.price) !== product.price)
        updates.price = parseFloat(data.price);
      if (parseInt(data.stock, 10) !== product.stock)
        updates.stock = parseInt(data.stock, 10);
      if (parseInt(data.categoryId) !== product.categoryId)
        updates.categoryId = parseInt(data.categoryId);

      if (Object.keys(updates).length > 0) {
        await mutateProduct.mutateAsync({ id, product: updates });
      }

      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("productId", product.id);
        const imageId = product.images[0].id;

        await mutateImageCover.mutateAsync({ id: imageId, formData });
      } else {
        console.error(
          "No se seleccionó un archivo o el ID del producto es indefinido:",
          product.id
        );
      }
    } catch (error) {
      console.error("Error actualizando el producto:", error);
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      const fileURL = URL.createObjectURL(file);
      setImagePreview(fileURL);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  if (loadingProduct) {
    return <p>Cargando producto...</p>;
  }

  return (
    <form className="p-6 bg-slate-400" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex text-[#111827] flex-col">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl md:text-4xl block my-4">Editar Producto</h1>
          <div className="flex gap-4 items-center justify-center font-bold">
            <button
              type="submit"
              className="bg-blue-500 px-4 py-2 h-8 rounded-md flex items-center text-white"
            >
              Actualizar
            </button>
            <Link
              to={"/admin/products"}
              className="bg-red-500 px-4 py-2 h-8 rounded-md flex items-center text-white"
            >
              Cancelar
            </Link>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8">
            <div className="flex flex-col gap-8">
              <label className="flex flex-col gap-2">
                <p className="text-xl">Producto</p>
                <input
                  type="text"
                  className="rounded-sm h-8 text-darkPrimary p-1"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-500">
                    Este campo es obligatorio
                  </span>
                )}
              </label>
              <label className="flex flex-col gap-2">
                <p className="text-xl">Precio</p>
                <input
                  type="number"
                  className="rounded-sm h-8 text-darkPrimary p-1"
                  {...register("price", { required: true })}
                />
                {errors.price && (
                  <span className="text-red-500">
                    Este campo es obligatorio
                  </span>
                )}
              </label>
              <label className="flex flex-col gap-2">
                <p className="text-xl">Stock</p>
                <input
                  type="number"
                  className="rounded-sm h-8 text-darkPrimary p-1"
                  {...register("stock", { required: true })}
                />
                {errors.stock && (
                  <span className="text-red-500">
                    Este campo es obligatorio
                  </span>
                )}
              </label>
              <label className="flex flex-col gap-2">
                <p className="text-xl">Categoría</p>
                {isLoading ? (
                  <p>Cargando categorías...</p>
                ) : error ? (
                  <p>Error al cargar las categorías</p>
                ) : (
                  <select
                    className="rounded-sm h-8 text-darkPrimary p-1"
                    {...register("categoryId", { required: true })}
                    disabled={isLoading}
                  >
                    <option value="">Selecciona una categoría</option>
                    {categories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                )}
                {errors.categoryId && (
                  <span className="text-red-500">
                    Este campo es obligatorio
                  </span>
                )}
              </label>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-8">
            <div className="p-4 rounded-md">
              <h2 className="text-3xl mb-4">Imágenes</h2>
              <div className="flex flex-col gap-8 my-8">
                <label className="flex flex-col gap-2">
                  Imagen Actual
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Vista Previa"
                      className="w-full h-auto"
                    />
                  )}
                </label>
                <label className="flex flex-col gap-2">
                  <p className="text-xl">Subir Nueva Imagen</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="rounded-sm h-8 p-1"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditProduct;
