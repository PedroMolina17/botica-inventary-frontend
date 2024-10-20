import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import AdminHome from "./pages/AdminHome";
import Login from "./pages/Login";
import AdminProducts from "./pages/Products/AdminProducts";
import AdminCategory from "./pages/Category/AdminCategory";
import CreateProduct from "./pages/Products/CreateProduct";
import Recovery from "./pages/Recovery";
import Users from "./pages/Users";
import EditProduct from "./pages/Products/EditProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import Cookies from "js-cookie";
import NotFound from "./components/NotFound";
const App = () => {
  const accessToken = Cookies.get("access_token");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={accessToken ? <Navigate to="/admin" /> : <Login />}
        />
        <Route path="/recovery" element={<Recovery />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<AdminHome />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="users" element={<Users />} />
          <Route path="products/create" element={<CreateProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="category" element={<AdminCategory />} />{" "}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
