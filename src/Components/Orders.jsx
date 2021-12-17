import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import customFetch from "../Utils/CustomFetch";
import { INR } from "../Utils/Constants";

export default function Orders() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await customFetch("/orders");
      const data = await res.json();
      console.log(data);
      setData(data);
    };
    getData();
  }, []);

  return (
    <Container sx={{ marginTop: 3 }}>
      <Paper elevation={8} sx={{ pt: 1, minHeight: "70vh" }}>
        <Typography variant="h4" component="div" sx={{ ml: 3 }}>
          Orders
        </Typography>
        <TableContainer>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Date Created</TableCell>
                <TableCell align="center">Start Time</TableCell>
                <TableCell align="center">Checkout Time</TableCell>
                <TableCell align="center">Duration</TableCell>
                <TableCell align="center">Total Cost</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <Row key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}

function Row(props) {
  const { row } = props;
  const navigate = useNavigate();

  const goToOrder = () => {
    navigate("/order", { state: row });
  };

  return (
    <Fragment>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          "&:hover": { backgroundColor: "aliceblue", cursor: "pointer" },
        }}
        onClick={goToOrder}
      >
        <TableCell align="center" component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell
          align="center"
          sx={{
            color: row.status === "CONFIRMED" ? "success.main" : "error.main",
          }}
        >
          {row.status}
        </TableCell>
        <TableCell align="center">
          {new Date(row.dateCreated).toLocaleString()}
        </TableCell>
        <TableCell align="center">
          {new Date(row.start).toLocaleString()}
        </TableCell>
        <TableCell align="center">
          {new Date(row.expiry).toLocaleString()}
        </TableCell>
        <TableCell align="center">
          {row.duration}
          hrs
        </TableCell>
        <TableCell align="center">
          {INR}
          {row.finalCharge}
        </TableCell>
      </TableRow>
    </Fragment>
  );
}
