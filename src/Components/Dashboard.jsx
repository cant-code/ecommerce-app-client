import { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
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
import BgImage from "../static/images/1209.jpg";
import customFetch from "../Utils/CustomFetch";
import CardWrapper from "./CardWrapper";
import { SetItem } from "../Utils/UtilFunctions";
import { END_TIME, START_TIME } from "../Utils/Constants";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  border: "1px solid",
  borderColor: alpha(theme.palette.primary.main, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  boxShadow: `${alpha(theme.palette.primary.main, 0.8)} 0 0 0 0.1rem`,
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

const CssTextField = styled(TextField, {
  shouldForwardProp: (props) => props !== "focusColor",
})((p) => ({
  // input label when focused
  "& label.Mui-focused": {
    color: p.focusColor,
  },
  "& .MuiOutlinedInput-input": {
    color: p.focusColor,
  },
  // focused color for input with variant='standard'
  "& .MuiInput-underline:after": {
    borderBottomColor: p.focusColor,
  },
  // focused color for input with variant='filled'
  "& .MuiFilledInput-underline:after": {
    borderBottomColor: p.focusColor,
  },
  // focused color for input with variant='outlined'
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: p.focusColor,
    },
  },
}));

const SearchStyles = {
  marginTop: "1em",
  backgroundColor: alpha("#fff", 0.5),
  padding: "1em",
};

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
    const startTime = format(startDate, "yyyy-MM-dd'T'HH:mm:ss");
    const endTime = format(endDate, "yyyy-MM-dd'T'HH:mm:ss");
    const res = await customFetch(
      "/area/search?" +
        new URLSearchParams({
          startTimeStamp: startTime,
          endTimeStamp: endTime,
          search: searchVal,
        })
    );
    const data = await res.json();
    setData(data);
    SetItem(START_TIME, startTime);
    SetItem(END_TIME, endTime);
    setLoading(false);
  };

  return (
    <Box
      display="flex"
      height="calc(100% - 4em)"
      sx={{
        backgroundImage: `url(${BgImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Container>
        <form onSubmit={search} style={SearchStyles}>
          <Stack direction="row" spacing={3} sx={{ paddingTop: 3 }}>
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
                <CssTextField
                  // focusColor="white"
                  focused
                  size="small"
                  {...props}
                />
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
                <CssTextField
                  // focusColor="white"
                  focused
                  size="small"
                  {...props}
                />
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
    </Box>
  );
}
