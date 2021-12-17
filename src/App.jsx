import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import SnackbarProvider from "./Context/snackbar";

export default function App() {
  return (
    <SnackbarProvider>
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </SnackbarProvider>
  );
}
