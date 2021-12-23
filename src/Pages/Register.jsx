import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";

import Image from "../static/images/5765700.jpg";
import {
  APPLICATION_JSON,
  ERROR,
  FIELD_REQUIRED,
  PASSWORD_MATCH,
  REGISTERED,
  SUCCESS,
  TOKEN,
} from "../Utils/Constants";
import { useSnackbar } from "../Context/snackbar";

const LoginGrid = styled(Grid)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const CustomPaper = styled(Paper)(() => ({
  margin: "2em 2em",
  padding: "1em 2em",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const initialBody = {
  username: "",
  password: "",
  confirmPassword: "",
  email: "",
  firstName: "",
  lastName: "",
};

export default function Register() {
  const { setMsg } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname ?? "/login";

  const [body, setBody] = useState(initialBody);
  const [formErrors, setFormErrors] = useState(initialBody);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [validation, setValidation] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(TOKEN)) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBody({
      ...body,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!!!formErrors.username.length && !!!formErrors.password.length) {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": APPLICATION_JSON },
          body: JSON.stringify(body),
        };
        const res = await fetch("/api/register", requestOptions);
        setValidation(false);
        if (res.status !== 201) {
          const data = await res.json();
          setMsg(data.detail, ERROR);
          return;
        }
        setMsg(REGISTERED, SUCCESS);
        navigate("/login");
      }
    };
    if (validation) fetchData();
  }, [body, formErrors, navigate, setMsg, validation, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleValidation();
  };

  const handleValidation = () => {
    setFormErrors(initialBody);
    const errors = {
      username: "",
      password: "",
      confirmPassword: "",
    };
    if (!!!body.username.length) errors.username = FIELD_REQUIRED;
    if (!!!body.password.length) errors.password = FIELD_REQUIRED;
    if (!!!body.confirmPassword.length) errors.confirmPassword = FIELD_REQUIRED;
    if (
      body.password.length &&
      body.confirmPassword.length &&
      body.confirmPassword !== body.password
    ) {
      errors.password = PASSWORD_MATCH;
      errors.confirmPassword = PASSWORD_MATCH;
    }
    setFormErrors(errors);
    setValidation(true);
  };

  return (
    <Grid className="globalMaxHeight" container>
      <Grid className="globalMaxHeight" item md={6} style={{ height: "100%" }}>
        <img
          src={Image}
          className="globalMaxHeight"
          alt="Illustation"
          style={{ width: "100%" }}
        />
      </Grid>
      <LoginGrid item md={6}>
        <CustomPaper elevation={24}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Typography variant="h2" sx={{ marginBottom: "1rem" }}>
              Register
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required={true}
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={body.username}
              onChange={handleChange}
              error={formErrors.username.length > 0}
              helperText={formErrors.username}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={body.email}
              onChange={handleChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              value={body.firstName}
              onChange={handleChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              value={body.lastName}
              onChange={handleChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              value={body.password}
              onChange={handleChange}
              error={formErrors.password.length > 0}
              helperText={formErrors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirm ? "text" : "password"}
              id="confirmPassword"
              value={body.confirmPassword}
              onChange={handleChange}
              error={formErrors.confirmPassword.length > 0}
              helperText={formErrors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={() =>
                        setShowConfirm((showConfirm) => !showConfirm)
                      }
                    >
                      {showConfirm ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ marginTop: (theme) => theme.spacing(1) }}
            >
              Register
            </Button>
            <Divider sx={{ my: 2 }} />
            <Grid sx={{ marginTop: "1rem" }} container direction="row-reverse">
              <Grid item>
                <Button component={Link} to="/login">
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </CustomPaper>
      </LoginGrid>
    </Grid>
  );
}
