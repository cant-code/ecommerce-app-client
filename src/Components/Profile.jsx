import { Container, Paper, Divider, Grid, Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useUserDetails } from "../Context/UserContext";

const Entry = ({ name, value, type = "text" }) => (
  <>
    <Grid item xs={2}>
      <Typography variant="subtitle1" sx={{ mr: 1 }}>
        {name}:
      </Typography>
    </Grid>
    <Grid item xs={10}>
      {type === "text" ? (
        <Typography variant="subtitle1"> {value}</Typography>
      ) : (
        value?.map((val) => (
          <Typography variant="subtitle1" component="li" key={val}>
            {val}
          </Typography>
        ))
      )}
    </Grid>
  </>
);

export default function Profile() {
  const { user } = useUserDetails();

  return (
    <Container>
      <Paper sx={{ padding: 2, my: 2 }} elevation={8}>
        <Typography variant="h3">Welcome {user?.firstName}</Typography>
        <Divider sx={{ my: 2 }} />
        <Grid container>
          <Grid item xs={2}>
            <Avatar
              sx={{
                width: "80%",
                height: "90%",
                backgroundColor: "primary.main",
              }}
            >
              <AccountBoxIcon sx={{ height: "100%", width: "100%" }} />
            </Avatar>
          </Grid>
          <Grid item xs={10}>
            <Grid container>
              <Entry name="First Name" value={user?.firstName} />
              <Entry name="Last Name" value={user?.lastName} />
              <Entry name="Username" value={user?.username} />
              <Entry name="Email" value={user?.email} />
              <Entry name="Roles" value={user?.roles} type="list" />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
