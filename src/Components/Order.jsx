import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import FlatCard from "./FlatCard";

import Img1 from "../static/images/bill/1.jpg";
import Img2 from "../static/images/bill/2.jpg";
import customFetch from "../Utils/CustomFetch";
import { APPLICATION_JSON, SUCCESS } from "../Utils/Constants";
import { useSnackbar } from "../Context/snackbar";

export default function Order() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setMsg } = useSnackbar();
  const images = [Img1, Img2];

  useEffect(() => {
    if (location?.state === null) {
      navigate("/");
    }
    console.log(location);
    setData(location?.state);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const endBooking = async () => {
    const res = await customFetch(`/orders/${data?.id}/finish`, {
      method: "POST",
      headers: { "Content-Type": APPLICATION_JSON },
    });
    if (res?.status === 200) {
      setData({
        ...data,
        status: "EXPIRED",
      });
      setMsg("Successful", SUCCESS);
    }
  };

  return (
    <Container sx={{ marginTop: 2 }}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Paper
          sx={{ padding: 2, mb: 2, width: "50%", mx: "auto" }}
          elevation={8}
        >
          <Stack direction="row">
            <Avatar
              variant="circular"
              src={images[Math.floor(Math.random() * images.length)]}
              alt="Image"
              sx={{ width: 140, height: 140 }}
            />
            <Stack sx={{ ml: 2 }}>
              <Typography>Invoice ID: {data.id}</Typography>
              <Typography>
                Date Created: {new Date(data.dateCreated).toLocaleString()}
              </Typography>
              <Typography>Status: {data.status}</Typography>
              <Typography>
                Start Time: {new Date(data.start).toLocaleString()}
              </Typography>
              <Typography>
                Tentative End Time: {new Date(data.expiry).toLocaleString()}
              </Typography>
              <Typography>Total Cost: &#8377;{data.totalCost}</Typography>
            </Stack>
          </Stack>
          {data?.status === "CONFIRMED" && (
            <Button
              variant="contained"
              onClick={endBooking}
              color="error"
              sx={{ mb: 2 }}
            >
              End Booking
            </Button>
          )}
          <FlatCard data={data.items} />
        </Paper>
      )}
      <Button component={Link} to="/" variant="contained">
        Go To Home
      </Button>
    </Container>
  );
}
