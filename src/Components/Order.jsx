import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import MuiTableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Img1 from "../static/images/bill/1.jpg";
import Img2 from "../static/images/bill/2.jpg";
import customFetch from "../Utils/CustomFetch";
import { APPLICATION_JSON, INR, SUCCESS } from "../Utils/Constants";
import { useSnackbar } from "../Context/snackbar";
import { styled } from "@mui/material/styles";

const TableCell = styled(MuiTableCell)(() => ({
  borderBottom: "0px",
}));

const TableHeadCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
}));

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
      const resData = await res.json();
      setData(resData);
      setMsg("Successful", SUCCESS);
    }
  };

  const getStatus = () => {
    return data?.status === "CONFIRMED";
  };

  return (
    <Container sx={{ marginTop: 2 }}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Paper
          sx={{ padding: 2, mb: 2, width: "100%", mx: "auto" }}
          elevation={8}
        >
          <Container>
            <Grid container>
              <Grid item xs={6}>
                <Avatar
                  variant="circular"
                  src={images[Math.floor(Math.random() * images.length)]}
                  alt="Image"
                  sx={{ width: 200, height: 200 }}
                />
              </Grid>
              <Grid container item xs={6}>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Stack>
                      <Typography variant="h3">Invoice</Typography>
                    </Stack>
                    <Stack>
                      <Typography variant="h6">Invoice Number:</Typography>
                      <Typography variant="body1" color="text.secondary">
                        {data.id}
                      </Typography>
                    </Stack>
                    <Stack>
                      <Typography variant="h6">Booking Date:</Typography>
                      <Typography variant="body1" color="text.secondary">
                        {new Date(data.dateCreated).toLocaleString()}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <img
                    alt="QR Code"
                    src={`data:image/png;base64,${data.qrcode}`}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid container>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <Stack>
                    <Typography variant="h6">Start Time:</Typography>
                    <Typography variant="body1" color="text.secondary">
                      {new Date(data.start).toLocaleString()}
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography variant="h6">End Time:</Typography>
                    <Typography variant="body1" color="text.secondary">
                      {new Date(data.expiry).toLocaleString()}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <Stack>
                    <Typography variant="h4">Booking Status:</Typography>
                    <Typography
                      variant="h5"
                      color={getStatus() ? "success.main" : "error.main"}
                    >
                      {data.status}
                    </Typography>
                  </Stack>
                  {getStatus() ? (
                    <Button
                      variant="contained"
                      onClick={endBooking}
                      color="error"
                      sx={{ mb: 2, width: "fit-content" }}
                    >
                      Checkout
                    </Button>
                  ) : (
                    <Stack>
                      <Typography variant="h6">Checkout Time:</Typography>
                      <Typography variant="body1" color="text.secondary">
                        {new Date(data.endTime).toLocaleString()}
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <TableContainer>
              <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableHeadCell colSpan={4}>ITEM</TableHeadCell>
                    <TableHeadCell align="right">COST.</TableHeadCell>
                    <TableHeadCell align="right">DURATION</TableHeadCell>
                    <TableHeadCell align="right">TOTAL</TableHeadCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4}>{data.items.name}</TableCell>
                    <TableCell colSpan={1} align="right">
                      {INR}
                      {data.items.price}/hr
                    </TableCell>
                    <TableCell colSpan={1} align="right">
                      {data.duration}hrs
                    </TableCell>
                    <TableCell colSpan={1} align="right">
                      {INR}
                      {data.totalCost}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={5} />
                    <TableCell colSpan={2} sx={{ padding: 0 }}>
                      <Divider sx={{ borderColor: "rgba(0,0,0,1)" }} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell rowSpan={3} colSpan={5} />
                    <TableCell>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Subtotal
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      {INR}
                      {data.totalCost}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Overtime Charge
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      {INR}
                      {data.extraCharges}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Total
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      {INR}
                      {data.finalCharge}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Paper>
      )}
    </Container>
  );
}
