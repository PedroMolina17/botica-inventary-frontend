import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const accessToken = Cookies.get("access_token");

  if (!accessToken) {
    return <Navigate to="/" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
