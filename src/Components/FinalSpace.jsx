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
import { useParams, useNavigate } from "react-router-dom";

import Car1 from "../static/images/cars/4026221.jpg";
import Car2 from "../static/images/cars/4064756.jpg";
import Car3 from "../static/images/cars/5643779.jpg";
import customFetch from "../Utils/CustomFetch";
import DialogBox from "./DialogBox";

export default function FinalSpace() {
  const params = useParams();
  const navigate = useNavigate();
  const cars = [Car1, Car2, Car3];

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClickListItem = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const performTransaction = async (value) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        duration: value,
        vehicularSpace: selectedItem,
      }),
    };
    try {
      const res = await customFetch("/order", options);
      const resData = await res.json();
      console.log(res);
      console.log(resData);
      navigate("/order", { state: resData });
    } catch (e) {
      navigate("/error");
    }
  };

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      console.log(selectedItem);
      console.log(newValue);
      performTransaction(newValue);
      return;
    }

    setSelectedItem(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await customFetch(`/parkingspace/byId/${params.id}`);
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
                      <Typography variant="body1" component="div">
                        Available Slots: {item.availableSlots} /{" "}
                        {item.totalSlots}
                      </Typography>
                      {data.array?.map((item) => (
                        <Typography
                          key={item.id}
                          component="li"
                          variant="body2"
                          color="text.secondary"
                        >
                          {item.name}
                        </Typography>
                      ))}
                    </CardContent>
                    <CardActions>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Price: &#8377;{item.price}/hr
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
      <DialogBox
        id="ringtone-menu"
        keepMounted
        open={open}
        onClose={handleClose}
        cost={selectedItem?.price}
      />
    </Container>
  );
}
