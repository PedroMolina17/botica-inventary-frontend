import { useForm } from "react-hook-form";
import { useCreateProduct } from "../../hooks/useProduct";
import { useCreateImageCover } from "../../hooks/useImageCover";
import { useGetAllCategory } from "../../hooks/useCategory";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const CreateProduct = () => {
  const navigate = useNavigate();
  const mutateProduct = useCreateProduct();
  const mutateImageCover = useCreateImageCover();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { data: categories, isLoading, error } = useGetAllCategory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const productResponse = await mutateProduct.mutateAsync({
        name: data.name,
        price: parseFloat(data.price),
        stock: parseInt(data.stock, 10),
        categoryId: parseInt(data.categoryId),
      });

      const productId = productResponse?.id;

      if (selectedFile && productId) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("productId", productId);

        await mutateImageCover.mutateAsync(formData);
      }

      navigate("/admin/products");
    } catch (error) {
      console.error("Error al crear producto o imagen:", error);
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

  return (
    <form className="p-6 bg-slate-400" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex text-[#111827] flex-col">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl md:text-4xl block my-4">Agregar Producto</h1>
          <div className="flex gap-4 items-center justify-center font-bold">
            <button
              type="submit"
              className="bg-blue-500 px-4 py-2 h-8 rounded-md flex items-center text-white"
            >
              Agregar
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
                  <span className="text-red-500">Este campo es requerido</span>
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
                  <span className="text-red-500">Este campo es requerido</span>
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
                  <span className="text-red-500">Este campo es requerido</span>
                )}
              </label>
              <label className="flex flex-col gap-2">
                <p className="text-xl">Categoría</p>

                {isLoading ? (
                  <p>Cargando categorías...</p>
                ) : error ? (
                  <p>Error al cargar categorías</p>
                ) : (
                  <select
                    className="rounded-sm h-8 text-darkPrimary p-1"
                    {...register("categoryId", { required: true })}
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
                  <span className="text-red-500">Este campo es requerido</span>
                )}
              </label>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-8">
            <div className="p-4 rounded-md">
              <h2 className="text-3xl mb-4">Imágenes</h2>
              <div className="flex flex-col gap-8 my-8">
                <label className="flex flex-col gap-2">
                  Imagen de portada
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="text-darkPrimary flex text-xl justify-center items-center border h-24 border-darkPrimary"
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-24 mt-2 object-contain"
                      style={{ width: "100%", maxHeight: "auto" }}
                    />
                  )}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateProduct;
