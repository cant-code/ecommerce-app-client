import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useParams, useNavigate } from "react-router-dom";

import CardWrapper from "./CardWrapper";

import Car1 from "../static/images/cars/4026221.jpg";
import Car2 from "../static/images/cars/4064756.jpg";
import Car3 from "../static/images/cars/5643779.jpg";
import customFetch from "../Utils/CustomFetch";

export default function Area() {
  const params = useParams();
  const navigate = useNavigate();
  const cars = [Car1, Car2, Car3];

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await customFetch(`/area/byId/${params.id}`);
        const data = await res.json();
        setData(data);
        setLoading(false);
      } catch (e) {
        navigate("/error");
      }
    };
    fetchData();
  }, [navigate, params.id]);

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
            <CardWrapper images={cars} data={data.parkingSlots} />
          </>
        )
      )}
    </Container>
  );
}
