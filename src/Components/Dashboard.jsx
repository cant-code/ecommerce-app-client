import { useState } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import DateTimePicker from "@mui/lab/MobileDateTimePicker";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import {
  roundToNearestMinutes,
  addHours,
  addMinutes,
  format,
  isPast,
} from "date-fns";
import { styled, alpha } from "@mui/material/styles";

import Area1 from "../static/images/area/23433.jpg";
import Area2 from "../static/images/area/23434.jpg";
import Area3 from "../static/images/area/20424685.jpg";
import customFetch from "../Utils/CustomFetch";
import CardWrapper from "./CardWrapper";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  border: "1px solid",
  borderColor: alpha(theme.palette.common.black, 0.2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    borderColor: alpha(theme.palette.common.black, 1),
  },
  width: "50%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
  },
}));

let baseTime = roundToNearestMinutes(new Date(), { nearestTo: 15 });
baseTime = isPast(baseTime) ? addMinutes(baseTime, 15) : baseTime;

export default function Dashboard() {
  const areas = [Area1, Area2, Area3];

  const [loading, setLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [data, setData] = useState(null);
  const [startDate, setStartDate] = useState(baseTime);
  const [endDate, setEndDate] = useState(addHours(baseTime, 1));

  const dataMapper = () => {
    return data
      ?.map((x) =>
        x.parkingSlots.map((y) => {
          const temp = y;
          y.area = x.name;
          return temp;
        })
      )
      .flat(1);
  };

  const search = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await customFetch(
      "/area/search?" +
        new URLSearchParams({
          startTimeStamp: format(startDate, "yyyy-MM-dd'T'HH:mm:ss"),
          endTimeStamp: format(endDate, "yyyy-MM-dd'T'HH:mm:ss"),
          search: searchVal,
        })
    );
    const data = await res.json();
    setData(data);
    setLoading(false);
  };

  return (
    <Container>
      <form onSubmit={search}>
        <Stack direction="row" spacing={3} sx={{ marginTop: 3 }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <DateTimePicker
            label="Checkin"
            renderInput={(props) => (
              <TextField disabled size="small" {...props} />
            )}
            allowKeyboardControl="false"
            value={startDate}
            disablePast
            minDateTime={baseTime}
            onChange={setStartDate}
            minutesStep={15}
          />
          <DateTimePicker
            label="Checkout"
            renderInput={(props) => (
              <TextField disabled size="small" {...props} />
            )}
            value={endDate}
            minDateTime={addMinutes(startDate, 15)}
            onChange={setEndDate}
            minutesStep={15}
          />
        </Stack>
        <Button type="submit" sx={{ marginTop: 1 }} variant="contained">
          Search
        </Button>
      </form>
      {loading ? (
        <Typography variant="h5">Loading...</Typography>
      ) : (
        data?.length > 0 && <CardWrapper images={areas} data={dataMapper()} />
      )}
    </Container>
  );
}
