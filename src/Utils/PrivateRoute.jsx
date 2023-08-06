import { useLocation, Navigate } from "react-router-dom";
import { useUserDetails } from "../Context/UserContext";

const PrivateRoute = ({ children }) => {
  let location = useLocation();
  const { loginStatus } = useUserDetails();

  return loginStatus ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
