import React, { useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSnackbar } from "../Context/snackbar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const [open, setOpen] = React.useState(false);
  const { msg, removeMsg } = useSnackbar();

  useEffect(() => {
      if (msg?.msg?.length > 0) setOpen(true);
  }, [msg]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    removeMsg();
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity={msg?.type}>
        {msg?.msg}
      </Alert>
    </Snackbar>
  );
}
