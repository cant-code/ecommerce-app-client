import { Route, Routes } from "react-router";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import PrivateRoute from "../Utils/PrivateRoute";
import Appbar from "../Components/Appbar";
import Dashboard from "../Components/Dashboard";
import Area from "../Components/Area";
import FinalSpace from "../Components/FinalSpace";
import Error from "../Components/Error";
import Order from "../Components/Order";
import Orders from "../Components/Orders";
import { useUserDetails } from "../Context/UserContext";
import { CheckToken } from "../Utils/UtilFunctions";
import customFetch from "../Utils/CustomFetch";
import Profile from "../Components/Profile";

export default function Main() {
  const { user, updateUser } = useUserDetails();

  const fetchUser = async () => {
    const res = await customFetch("/user");
    const data = await res.json();
    updateUser(data);
  };

  if (user === null && CheckToken()) {
    fetchUser();
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Appbar />
      <Routes>
        <Route index element={<Dashboard />} />
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route path="area/:id" element={<Area />} />
        <Route path="parking/:id" element={<FinalSpace />} />
        <Route
          path="order"
          element={
            <PrivateRoute>
              <Order />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </LocalizationProvider>
  );
}
