import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate, useResolvedPath, useMatch, Link } from "react-router-dom";
import { useSnackbar } from "../Context/snackbar";
import { INFO, REFRESH_TOKEN, TOKEN } from "../Utils/Constants";
import { CheckToken, DeleteItem } from "../Utils/UtilFunctions";
import { useUserDetails } from "../Context/UserContext";

function CustomButton({ children, to, ...props }) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Button to={to} color={match ? "warning" : "inherit"} {...props}>
      {children}
    </Button>
  );
}

export default function Appbar() {
  const navigate = useNavigate();
  const { setMsg } = useSnackbar();
  const { removeUser } = useUserDetails();
  const loginStatus = CheckToken();

  const logout = () => {
    DeleteItem(TOKEN);
    DeleteItem(REFRESH_TOKEN);
    removeUser();
    setMsg("Logged out successfully", INFO);
    navigate("/login");
  };

  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Parking Slot Bookings
        </Typography>
        <Box marginLeft={2}>
          <CustomButton component={Link} to="/">
            Home
          </CustomButton>
          {loginStatus && (
            <CustomButton component={Link} to="/orders">
              Orders
            </CustomButton>
          )}
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: "flex" }}>
          {loginStatus ? (
            <Tooltip title="Logout">
              <IconButton
                size="large"
                aria-label="Logout"
                color="inherit"
                onClick={logout}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Login">
              <IconButton
                size="large"
                aria-label="Login"
                color="inherit"
                onClick={() => navigate("/login")}
              >
                <LoginIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
