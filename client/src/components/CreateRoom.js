import React, { useState } from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50% , -50%)",
    height: 450,
    width: 400,
    borderRadius: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
}));

function CreateRoom({ roomName, setRoomName, action }) {
  const classes = useStyles();
  const [limit, setLimit] = useState(false);

  return (
    <>
      <Paper elevation={12} className={classes.root}>
        <Typography variant="h5" color="primary">
          Create Room
        </Typography>
        <TextField
          type="text"
          placeholder="Room Name"
          label="Room Name"
          onChange={(e) => setRoomName(e.target.value)}
          value={roomName}
        />
        {limit && (
          <TextField
            type="number"
            label="Set Limit"
            placeholder="set limit of members"
          />
        )}
        <FormControlLabel
          label={
            <Typography variant="h6">
              Do you want set members limit ?
            </Typography>
          }
          control={
            <Switch
              checked={limit}
              onChange={() => setLimit(!limit)}
              color="secondary"
            />
          }
        />
        <Button color="primary" variant="contained" onClick={action}>
          Create Room
        </Button>
      </Paper>
    </>
  );
}

export default CreateRoom;
