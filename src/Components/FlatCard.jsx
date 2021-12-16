import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import Car1 from "../static/images/cars/4026221.jpg";
import Car2 from "../static/images/cars/4064756.jpg";
import Car3 from "../static/images/cars/5643779.jpg";

import { INR } from "../Utils/Constants";

export default function FlatCard(props) {
  const cars = [Car1, Car2, Car3];
  const { data } = props;
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate(`/parking/${data.parkingSpaceID}`);
  };

  return (
    <Card
      sx={{
        display: "flex",
        cursor: "pointer",
        "&:hover": { backgroundColor: "aliceblue" },
      }}
      onClick={navigateTo}
    >
      <CardMedia
        component="img"
        sx={{ width: 220, padding: 1 }}
        image={cars[Math.floor(Math.random() * cars.length)]}
        alt="Car Images"
      />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography variant="h5">Name: {data.name}</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Price: {INR}
            {data.price} / hr
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
