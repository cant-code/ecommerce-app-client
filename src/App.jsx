import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import SnackbarProvider from "./Context/snackbar";
import Register from "./Pages/Register";

export default function App() {
  return (
    <SnackbarProvider>
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </SnackbarProvider>
  );
}
