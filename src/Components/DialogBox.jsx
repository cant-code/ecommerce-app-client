import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function DialogBox(props) {
  const { onClose, open, cost, ...other } = props;
  const [value, setValue] = useState(1);

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%" } }}
      maxWidth="xs"
      open={open}
      onClose={handleCancel}
      {...other}
    >
      <DialogTitle>Select Hours</DialogTitle>
      <DialogContent>
        <DialogContentText>Select the amount of hours:</DialogContentText>
        <Slider
          aria-label="Hours"
          defaultValue={1}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="off"
          step={1}
          marks
          min={1}
          max={10}
        />
        <Typography variant="body1">
          Time selected: {value}
          {value === 1 ? "hr" : "hrs"}
        </Typography>
        <Box sx={{ flex: "1 1 auto" }} />
        <Typography variant="body1">
          Total Cost: &#8377;{value * cost}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}
