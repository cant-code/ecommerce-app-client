import Grid from "@mui/material/Grid";
import ItemCard from "./ItemCard";

export default function CardWrapper({ data, images }) {
  data?.map((item) => {
    if (Object.keys(item).find((x) => x === "parkingSlots")) {
      item.array = item.parkingSlots;
      item.title = "Parking Space";
      item.link = `/area/${item.id}`;
      delete item.parkingSlots;
    } else if (Object.keys(item).find((x) => x === "vehicularSpaces")) {
      item.array = item.vehicularSpaces;
      item.title = "Parking Space";
      item.link = `/parking/${item.id}`;
      delete item.vehicularSpaces;
    }
    return item;
  });

  return (
    <Grid container rowSpacing={3} columnSpacing={2} paddingY={2}>
      {data?.map((item) => (
        <Grid key={item.id} item xs={4}>
          <ItemCard
            image={images[Math.floor(Math.random() * images.length)]}
            data={item}
          />
        </Grid>
      ))}
    </Grid>
  );
}
