import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import useChat from "../sockets/useChat";

import RoomContent from "../components/RoomContent";
import InputField from "../components/InputField";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

function RoomChat({ classes, roomId, user_id, username, messages }) {
  const { send, message, setMessage } = useChat(roomId, user_id);

  return (
    <Paper className={classes.paper} elevation={12}>
      <Grid container spacing={2} style={{ height: "100%" }}>
        <Grid item xs={12} className={classes.header}>
          <Typography
            style={{ textAlign: "center" }}
            color="primary"
            varinat="h5"
          >
            {roomId}
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.content}>
          <RoomContent messages={messages} user_id={user_id} />
        </Grid>
        <Grid item xs={12} className={classes.footer}>
          <InputField
            message={message}
            setMessage={setMessage}
            send={() => send(username)}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default RoomChat;
