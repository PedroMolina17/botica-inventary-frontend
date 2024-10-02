import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdPersonSearch } from "react-icons/md";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 10,
  });

  const data = {
    results: [
      { id: 1, name: "Producto 1", stock: 100 },
      { id: 2, name: "Producto 2", stock: 50 },
      { id: 3, name: "Producto 3", stock: 75 },
      { id: 4, name: "Producto 4", stock: 200 },
      { id: 5, name: "Producto 5", stock: 150 },
    ],
    info: {
      count: 5,
    },
  };

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
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
      header: "Accion",
    },
  ];

  const UpdateProductView = (id) => {
    console.log("Editando producto con ID:", id);
  };

  const deleteProduct = (id) => {
    console.log("Eliminando producto con ID:", id);
  };

  const table = useReactTable({
    data: data.results || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    rowCount: data.info.count || 0,
    state: {
      pagination,
      sorting: sorting,
      globalFilter: filtering,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    debugTable: true,
  });

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
                  className="text-center text-sm p-4 cursor-pointer hover:bg-[#313151] transition-colors"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted() !== null &&
                  header.column.getIsSorted() !== false
                    ? {
                        asc: " ↓",
                        desc: " ↑",
                      }[header.column.getIsSorted()]
                    : null}
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
              {row.getVisibleCells().map((cell, index) => (
                <td key={cell.id} className="text-center p-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  {index === columns.length - 1 && (
                    <div className="flex gap-4 items-center justify-center">
                      <button
                        onClick={() => UpdateProductView(row.original.id)}
                        className="text-[#139dba] hover:text-blue-400 text-2xl focus:outline-none transition-colors"
                        aria-label="Editar producto"
                      >
                        <CiEdit className="text-xl" />
                      </button>
                      <button
                        onClick={() => deleteProduct(row.original.id)}
                        className="text-red-500 hover:text-red-700 text-2xl focus:outline-none transition-colors"
                        aria-label="Eliminar producto"
                      >
                        <MdDeleteOutline className="text-xl" />
                      </button>
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center w-full mt-4">
        <span className="text-sm text-gray-400">
          Mostrando {table.getFilteredRowModel().rows.length} de{" "}
          {data.info.count} productos
        </span>
      </div>
    </div>
  );
};

export default AdminProducts;
