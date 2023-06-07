import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import { MobileDateTimePicker as DateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import {
  addMinutes,
  roundToNearestMinutes,
  isPast,
  differenceInMinutes,
} from "date-fns";
import { GetItem } from "../Utils/UtilFunctions";
import { DATE_PAST, END_TIME, INR, START_TIME } from "../Utils/Constants";

let baseTime = roundToNearestMinutes(new Date(), { nearestTo: 15 });
baseTime = isPast(baseTime) ? addMinutes(baseTime, 15) : baseTime;

export default function DialogBox(props) {
  const { onClose, open, cost, ...other } = props;
  const [startTime, setStartTime] = useState(new Date(GetItem(START_TIME)));
  const [endTime, setEndTime] = useState(new Date(GetItem(END_TIME)));
  const [errors, setErrors] = useState("");

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    if (isPast(startTime)) {
      setErrors(DATE_PAST);
      return;
    }
    onClose(startTime, endTime);
  };

  const calcTime = () => {
    return differenceInMinutes(endTime, startTime) / 60;
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%" } }}
      maxWidth="xs"
      open={open}
      onClose={handleCancel}
      {...other}
    >
      <DialogTitle>Place Order</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <DialogContentText>
            Select the Start Time and End Time:
          </DialogContentText>
          <DateTimePicker
            label="Checkin"
            renderInput={(props) => (
              <TextField
                disabled
                size="small"
                error={errors.length > 0}
                helperText={errors}
                {...props}
              />
            )}
            allowKeyboardControl="false"
            value={startTime}
            disablePast
            minDateTime={baseTime}
            onChange={setStartTime}
            minutesStep={15}
          />
          <DateTimePicker
            label="Checkout"
            renderInput={(props) => (
              <TextField disabled size="small" {...props} />
            )}
            value={endTime}
            minDateTime={addMinutes(startTime, 15)}
            onChange={setEndTime}
            minutesStep={15}
          />
          <Typography variant="body1">
            Duration in Hours: {calcTime()} hrs
          </Typography>
          <Typography variant="body1" gutterBottom>
            Total Cost: {INR}
            {calcTime() * cost}
          </Typography>
        </Stack>
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
