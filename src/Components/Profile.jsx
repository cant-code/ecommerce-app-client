import { Container, Paper, Divider, Grid, Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useUserDetails } from "../Context/UserContext";
import PropTypes from "prop-types";

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

Entry.propTypes = {
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    type: PropTypes.string
}

export default function Profile() {
  const { keycloak } = useUserDetails();

  return (
    <Container>
      <Paper sx={{ padding: 2, my: 2 }} elevation={8}>
        <Typography variant="h3">Welcome {keycloak.tokenParsed?.given_name}</Typography>
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
              <Entry name="First Name" value={keycloak.tokenParsed?.given_name} />
              <Entry name="Last Name" value={keycloak.tokenParsed?.family_name} />
              <Entry name="Username" value={keycloak.tokenParsed?.preferred_username} />
              <Entry name="Email" value={keycloak.tokenParsed?.email} />
              <Entry name="Roles" value={keycloak.tokenParsed?.realm_access?.roles} type="list" />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
