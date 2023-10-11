import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import SnackbarProvider from "./Context/snackbar";
import UserContext from "./Context/UserContext";

export default function App() {
  return (
    <SnackbarProvider>
      <UserContext>
        <Routes>
          <Route
            path="/*"
            element={
              <Main />
            }
          />
          <Route path="login" element={<Login />} />s
        </Routes>
      </UserContext>
    </SnackbarProvider>
  );
}
