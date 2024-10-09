import { useGetAllCategory } from "../../hooks/useCategory"; // Asegúrate de que el hook esté exportando correctamente
import { Link } from "react-router-dom";
import { MdPersonSearch } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md"; // Importa el icono para eliminar
import { CiEdit } from "react-icons/ci"; // Importa el icono para editar
import { useState } from "react";

const AdminCategory = () => {
  const { data: categories, isLoading, error } = useGetAllCategory();
  const [filtering, setFiltering] = useState("");

  const filteredCategories = categories?.filter((category) =>
    category.name.toLowerCase().includes(filtering.toLowerCase())
  );

  if (isLoading) {
    return <p>Cargando categorías...</p>;
  }

  if (error) {
    return <p>Error al cargar categorías: {error.message}</p>;
  }

  const handleDelete = (id) => {
    // Aquí puedes agregar la lógica para eliminar la categoría
    console.log(`Eliminar categoría con ID: ${id}`);
  };

  return (
    <div className="mx-2 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-white text-2xl">
          List of Categories
        </h2>
        <div className="flex items-center focus-within:border-2 gap-2 px-2.5 rounded-md py-1 bg-[#111827] border border-slate-600">
          <MdPersonSearch className="text-white text-xl font-bold" />
          <input
            type="text"
            placeholder="Search Category..."
            value={filtering}
            className="outline-none bg-transparent w-full text-sm text-gray-300"
            onChange={(e) => setFiltering(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end items-center my-4">
        <Link
          to={"/admin/categories/create"}
          className="text-white flex items-center h-10 rounded-md px-4 py-2 gap-2 bg-[#111827] hover:bg-[#101827] transition-colors"
        >
          <IoAddCircle />
          Create Category
        </Link>
      </div>

      <table className="w-full text-white bg-[#1e1e35] rounded-lg overflow-hidden shadow-md">
        <thead className="text-slate-300 bg-[#272743]">
          <tr className="border-b border-slate-700">
            <th className="text-center text-sm p-4">ID</th>
            <th className="text-center text-sm p-4">Name</th>
            <th className="text-center text-sm p-4">Actions</th>
          </tr>
        </thead>
        <tbody className="font-normal text-md">
          {filteredCategories?.map((category, index) => (
            <tr
              key={category.id}
              className={`hover:bg-[#272743] transition-colors ${
                index % 2 === 0 ? "bg-[#1e1e35]" : "bg-[#232343]"
              }`}
            >
              <td className="text-center p-4">{category.id}</td>
              <td className="text-center p-4">{category.name}</td>
              <td className="text-center p-4">
                <div className="flex justify-center gap-4">
                  <Link
                    to={`/admin/categories/edit/${category.id}`}
                    className="text-[#139dba] hover:text-blue-400 text-2xl focus:outline-none transition-colors"
                    aria-label="Editar categoría"
                  >
                    <CiEdit className="text-xl" />
                  </Link>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="text-red-500 hover:text-red-700 text-2xl focus:outline-none transition-colors"
                    aria-label="Eliminar categoría"
                  >
                    <MdDeleteOutline className="text-xl" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCategory;
