import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  return (
    <div>
      <Sidebar />
      <main className="ml-96">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
