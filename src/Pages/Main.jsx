import { Route, Routes } from "react-router";
import Appbar from "../Components/Appbar";
import Dashboard from "../Components/Dashboard";
import Area from "../Components/Area";
import FinalSpace from "../Components/FinalSpace";
import Error from "../Components/Error";
import Order from "../Components/Order";
import Orders from "../Components/Orders";

export default function Main() {
  return (
    <>
      <Appbar />
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="area/:id" element={<Area />} />
        <Route path="parking/:id" element={<FinalSpace />} />
        <Route path="order" element={<Order />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}
