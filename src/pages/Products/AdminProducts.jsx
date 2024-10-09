import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { IoAddCircle } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdPersonSearch } from "react-icons/md";
import { useState } from "react";
import { useGetAllProducts, useDeleteProduct } from "../../hooks/useProduct";
import { Link, useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const [filtering, setFiltering] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 10,
  });

  const { data, isLoading, isError } = useGetAllProducts();
  const deleteProductMutation = useDeleteProduct();
  const navigate = useNavigate();

  if (isError) {
    return <div>Error loading products.</div>;
  }

  const fallbackImage = "../../../public/default-fallback.png";
  const baseURL = "http://localhost:3000";

  const columns = [
    {
      accessorKey: "images",
      header: "Image",
      cell: ({ row }) => (
        <div className="flex justify-center">
          <img
            src={`${baseURL}${row.original.images[0]?.name || fallbackImage}`}
            alt={row.original.name}
            className="w-16 h-16 object-cover"
          />
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "stock",
      header: "Stock",
    },
    {
      header: "Acción",
      cell: ({ row }) => (
        <div className="flex gap-4 items-center justify-center">
          <button
            onClick={() => UpdateProductView(row.original.id)}
            className="text-[#139dba] hover:text-blue-400 text-2xl focus:outline-none transition-colors"
            aria-label="Editar producto"
          >
            <CiEdit className="text-xl" />
          </button>
          <button
            onClick={() => deleteProductMutation.mutate(row.original.id)}
            className="text-red-500 hover:text-red-700 text-2xl focus:outline-none transition-colors"
            aria-label="Eliminar producto"
          >
            <MdDeleteOutline className="text-xl" />
          </button>
        </div>
      ),
    },
  ];

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: { pagination, sorting, globalFilter: filtering },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getPaginationRowModel: () => {},
  });

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  const UpdateProductView = (id) => {
    navigate(`/admin/products/edit/${id}`);
  };

  return (
    <div className="mx-2 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-white text-2xl">List of Products</h2>
        <div className="flex items-center focus-within:border-2 gap-2 px-2.5 rounded-md py-1 bg-[#111827] border border-slate-600">
          <MdPersonSearch className="text-white text-xl font-bold" />
          <input
            type="text"
            placeholder="Search Product..."
            value={filtering}
            className="outline-none bg-transparent w-full text-sm text-gray-300"
            onChange={(e) => setFiltering(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end items-center my-4">
        <Link
          to={"/admin/products/create"}
          className="text-white flex items-center h-10 rounded-md px-4 py-2 gap-2 bg-[#111827] hover:bg-[#101827] transition-colors"
        >
          <IoAddCircle />
          Create Product
        </Link>
      </div>

      <table className="w-full text-white bg-[#1e1e35] rounded-lg overflow-hidden shadow-md">
        <thead className="text-slate-300 bg-[#272743]">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b border-slate-700">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`text-center text-sm p-4 cursor-pointer ${
                    header.column.getCanSort()
                      ? "hover:bg-[#313151] transition-colors"
                      : ""
                  }`}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="font-normal text-md">
          {table.getRowModel().rows.map((row, rowIndex) => (
            <tr
              key={row.id}
              className={`hover:bg-[#272743] transition-colors ${
                rowIndex % 2 === 0 ? "bg-[#1e1e35]" : "bg-[#232343]"
              }`}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="text-center p-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
