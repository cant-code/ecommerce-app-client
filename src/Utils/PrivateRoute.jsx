import { useLocation, Navigate } from "react-router-dom";
import { useUserDetails } from "../Context/UserContext";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  let location = useLocation();
  const { loginStatus } = useUserDetails();

  return loginStatus ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node
};

export default PrivateRoute;
