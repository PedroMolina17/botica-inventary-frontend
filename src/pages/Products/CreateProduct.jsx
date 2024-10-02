import { FaImage } from "react-icons/fa";
import {
  MdOutlineAttachMoney,
  MdOutlineProductionQuantityLimits,
  MdLocalOffer,
  MdOutlineLocalOffer,
} from "react-icons/md";
import { Link } from "react-router-dom";

const CreateProduct = () => {
  return (
    <form className="p-6 bg-slate-400">
      <div className="flex text-[#111827] flex-col">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl md:text-4xl block my-4">Add Product</h1>
          <div className="flex gap-4 items-center justify-center font-bold">
            <button className="bg-blue-500 px-4 py-2 h-8 rounded-md flex items-center text-white">
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
                />
              </label>
              <label className="flex flex-col gap-2">
                <p className="text-xl">Descripción</p>
                <textarea className="rounded-sm h-48 text-darkPrimary p-1" />
              </label>
              <div className="flex flex-col gap-2">
                <p className="text-xl">Inventario</p>
                <div className="border p-4 flex flex-col gap-4 text-lg">
                  <label className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MdOutlineAttachMoney /> Precio
                    </div>
                    <input
                      type="number"
                      className="w-full md:w-96 rounded-sm text-black p-1"
                      placeholder="$0.00"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MdOutlineProductionQuantityLimits /> Cantidad
                    </div>
                    <input
                      type="number"
                      className="w-full md:w-96 rounded-sm text-black p-1"
                      placeholder="0"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MdLocalOffer /> Precio en promoción
                    </div>
                    <input
                      type="number"
                      placeholder="$0.00"
                      className="w-full md:w-96 rounded-sm text-black p-1"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MdOutlineLocalOffer /> Descripción en promoción
                    </div>
                    <input
                      type="text"
                      placeholder="Descripción"
                      className="w-full md:w-96 rounded-sm text-black p-1"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 flex flex-col gap-8">
            <div className="bg-darkThird p-4 rounded-md">
              <h2 className="text-3xl mb-4">Organizar</h2>
              <div className="flex flex-col gap-8 my-8">
                <label className="flex flex-col gap-2">
                  Categoría
                  <select className="h-8 text-darkPrimary">
                    <option>Seleccione una categoría</option>
                  </select>
                </label>
                <label className="flex flex-col gap-2">
                  Marca
                  <select className="h-8 text-darkPrimary">
                    <option>Seleccione una marca</option>
                  </select>
                </label>
                <label className="flex flex-col gap-2">
                  Etiquetas
                  <select className="h-8 text-darkPrimary">
                    <option>Valor 1</option>
                    <option>Valor 2</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="p-4 rounded-md">
              <h2 className="text-3xl mb-4">Imágenes</h2>
              <div className="flex flex-col gap-8 my-8">
                <label className="flex flex-col gap-2">
                  Imagen de Portada
                  <button className="text-darkPrimary flex text-4xl justify-center items-center border h-24 border-darkPrimary">
                    <FaImage />
                  </button>
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
