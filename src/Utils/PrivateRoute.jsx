import { useLocation, Navigate } from "react-router-dom";
import { CheckToken } from "./UtilFunctions";

const PrivateRoute = ({ children }) => {
  let location = useLocation();

  return CheckToken() ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
