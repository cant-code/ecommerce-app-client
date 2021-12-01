import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./Utils/PrivateRoute";
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import SnackbarProvider from "./Context/snackbar";

export default function App() {
  return (
    <SnackbarProvider>
      <Routes>
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          }
        />
        <Route path="login" element={<Login />} />
      </Routes>
    </SnackbarProvider>
  );
}
