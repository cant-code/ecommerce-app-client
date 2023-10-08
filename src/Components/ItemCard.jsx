import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { INR } from "../Utils/Constants";
import PropTypes from "prop-types";

export default function ItemCard({ image, data }) {
  return (
    <Card sx={{ maxWidth: 345 }} elevation={12}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.name} ({data.area})
        </Typography>
        <Typography variant="body1" component="div">
          {data.title}s:
        </Typography>
        {data.array?.map((item) => (
          <Typography
            key={item.id}
            component="li"
            variant="body2"
            color="text.secondary"
          >
            {item.name}: {INR}
            {item.price}/hr
          </Typography>
        ))}
      </CardContent>
      <CardActions>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button component={Link} size="small" to={data.link}>
          View {data.title}
        </Button>
      </CardActions>
    </Card>
  );
}

ItemCard.propTypes = {
    image: PropTypes.string,
    data: PropTypes.object
}