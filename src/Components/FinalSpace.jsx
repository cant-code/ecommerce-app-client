import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";

import Car1 from "../static/images/cars/4026221.jpg";
import Car2 from "../static/images/cars/4064756.jpg";
import Car3 from "../static/images/cars/5643779.jpg";
import customFetch from "../Utils/CustomFetch";
import DialogBox from "./DialogBox";
import {
  APPLICATION_JSON,
  END_TIME,
  INR,
  START_TIME,
} from "../Utils/Constants";
import { GetItem } from "../Utils/UtilFunctions";
import { useUserDetails } from "../Context/UserContext";

export default function FinalSpace() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const cars = [Car1, Car2, Car3];
  const { loginStatus } = useUserDetails();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClickListItem = (item) => {
    if (!loginStatus) {
      setLoginOpen(true);
      return;
    }
    setSelectedItem(item);
    setOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const navigateToLogin = () => {
    navigate("/login", { state: { from: location } });
  };

  const performTransaction = async (startTimeStamp, endTimeStamp) => {
    const startTime = format(startTimeStamp, "yyyy-MM-dd'T'HH:mm:ss");
    const endTime = format(endTimeStamp, "yyyy-MM-dd'T'HH:mm:ss");
    const options = {
      method: "POST",
      headers: { "Content-Type": APPLICATION_JSON },
      body: JSON.stringify({
        startTimeStamp: startTime,
        endTimeStamp: endTime,
        vehicularSpace: selectedItem,
      }),
    };
    try {
      const res = await customFetch("/orders", options);
      const resData = await res.json();
      navigate("/order", { state: resData });
    } catch (e) {
      navigate("/error");
    }
  };

  const handleClose = (startTimeStamp, endTimeStamp) => {
    setOpen(false);

    if (startTimeStamp && endTimeStamp) {
      performTransaction(startTimeStamp, endTimeStamp);
      return;
    }

    setSelectedItem(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startDate = GetItem(START_TIME);
        const endDate = GetItem(END_TIME);
        let url = `/parkingspace/${params.id}`;
        if (startDate !== null || endDate !== null) {
          url = url + "?" + new URLSearchParams({ startDate, endDate });
        }
        const res = await customFetch(url);
        const data = await res.json();
        setData(data);
        setLoading(false);
      } catch (e) {
        navigate("/error");
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {loading ? (
        <Typography variant="h5">Loading...</Typography>
      ) : (
        data && (
          <>
            <Typography variant="h3" component="div">
              Area: {data.name}
            </Typography>
            <Grid container rowSpacing={3} columnSpacing={2} paddingY={2}>
              {data?.vehicularSpaces?.map((item) => (
                <Grid key={item.id} item xs={4}>
                  <Card sx={{ maxWidth: 345 }} elevation={12}>
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="140"
                      image={cars[Math.floor(Math.random() * cars.length)]}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.name}
                      </Typography>
                      {item.availableSlots > 0 && (
                        <Typography variant="body1" component="div">
                          Available Slots: {item.availableSlots} /{" "}
                          {item.totalSlots}
                        </Typography>
                      )}
                    </CardContent>
                    <CardActions>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Price: {INR}
                        {item.price}/hr
                      </Typography>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleClickListItem(item)}
                      >
                        Book
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )
      )}
      {open && (
        <DialogBox
          id="ringtone-menu"
          open={open}
          onClose={handleClose}
          cost={selectedItem?.price}
        />
      )}
      {loginOpen && (
        <Dialog
          open={loginOpen}
          onClose={handleLoginClose}
          aria-labelledby="login-dialog"
          aria-describedby="Navigate to login page"
        >
          <DialogTitle id="login-dialog-title">Login to Continue</DialogTitle>
          <DialogContent>
            <DialogContentText id="login-dialog-description">
              To continue and confirm your booking, please login.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleLoginClose}>Close</Button>
            <Button onClick={navigateToLogin} autoFocus>
              Login
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
}
