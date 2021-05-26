import React, { useState } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 350,
    width: 350,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50% , -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 25,
  },
}));

function JoinRoom({ user_id, username, created_at, user_join }) {
  const classes = useStyles();
  const history = useHistory();
  const [roomName, setRoomName] = useState("");

  const join = () => {
    if (roomName) {
      axios
        .post("/room/join", { username, user_id, room_name: roomName })
        .then((result) => {
          history.push(`/room/${roomName}`);
          user_join({ user_id, username, created_at });
        })
        .catch((error) => alert(JSON.stringify(error)));
    } else {
      alert("Room's name must be specified.");
    }
  };
  return (
    <Paper className={classes.root} elevation={12}>
      <Typography style={{ textAlign: "center" }} variant="h5" color="primary">
        Join To Room
      </Typography>
      <TextField
        type="text"
        label="Room Name"
        placeholder="write..."
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <Button color="primary" variant="contained" size="large" onClick={join}>
        Join
      </Button>
    </Paper>
  );
}

export default JoinRoom;
