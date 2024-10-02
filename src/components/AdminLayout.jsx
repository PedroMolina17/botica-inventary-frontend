import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  return (
    <div className="bg-[#94a3b8] h-screen">
      <Sidebar />
      <main className="ml-64 max-md:ml-0 p-4 max-md:pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
