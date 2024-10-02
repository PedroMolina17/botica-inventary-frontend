import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import AdminHome from "./pages/AdminHome";
import Login from "./pages/Login";
import AdminProducts from "./pages/Products/AdminProducts";
import AdminCategory from "./pages/AdminCategory";
import CreateProduct from "./pages/Products/CreateProduct";
import Recovery from "./pages/Recovery";
import Users from "./pages/Users";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="" element={<AdminHome />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="users" element={<Users />} />
          <Route path="products/create" element={<CreateProduct />} />
          <Route path="category" element={<AdminCategory />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
