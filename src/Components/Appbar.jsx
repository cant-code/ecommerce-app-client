import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";
import {Link, useMatch, useNavigate, useResolvedPath} from "react-router-dom";
import {useSnackbar} from "../Context/snackbar";
import {INFO, REFRESH_TOKEN, TOKEN} from "../Utils/Constants";
import {DeleteItem} from "../Utils/UtilFunctions";
import {useUserDetails} from "../Context/UserContext";
import PropTypes from "prop-types";

function CustomButton({ children, to, ...props }) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Button to={to} color={match ? "warning" : "inherit"} {...props}>
      {children}
    </Button>
  );
}

CustomButton.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string
}

export default function Appbar() {
  const navigate = useNavigate();
  const { setMsg } = useSnackbar();
  const { loginStatus, keycloak } = useUserDetails();

  const logout = () => {
    DeleteItem(TOKEN);
    DeleteItem(REFRESH_TOKEN);
    keycloak.logout();
    setMsg("Logged out successfully", INFO);
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
            <>
              <CustomButton component={Link} to="/orders">
                Orders
              </CustomButton>
              <CustomButton component={Link} to="/profile">
                Profile
              </CustomButton>
            </>
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
