import React from "react";
import { connect } from "react-redux";
import axios from "axios";

import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import ProfileImage from "./ProfileImage";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  content: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  actions: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
}));

function NavBar({ username, id, profile_image_id }) {
  const classes = useStyles();
  const [image, setImage] = React.useState(null);

  React.useEffect(() => {
    axios
      .get("/uploads/login-background.jpg")
      .then(({ data }) => alert(data))
      .catch((error) => alert(JSON.stringify(error, null, 2)));
  }, []);

  const logOut = () => {
    axios.post("/user/log-out").then(() => window.location.reload());
  };

  return (
    <>
      <AppBar
        style={{
          position: "sticky",
          top: 0,
          padding: "10px 0px ",
        }}
      >
        <Grid container spacing={2} style={{ height: "100%" }}>
          <Grid item lg={9} md={8} sm={7} xs={6} className={classes.content}>
            <ProfileImage user_id={id} profile_image_id={profile_image_id} />
          </Grid>
          <Grid item lg={3} md={4} sm={5} xs={6} className={classes.actions}>
            <Typography style={{ color: "white" }} variant="h5">
              {username}
            </Typography>
            <Button
              color="secondary"
              size="large"
              variant="contained"
              onClick={logOut}
            >
              Log Out
            </Button>
          </Grid>
        </Grid>
      </AppBar>
    </>
  );
}

const mapState = (store) => {
  const user = store.user;
  return {
    username: user.username,
    id: user.id,
    profile_image_id: user.profile_image_id,
  };
};

export default connect(mapState, {})(NavBar);
