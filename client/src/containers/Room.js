import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import useChat from "../sockets/useChat";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import RoomChat from "../components/RoomChat";

const useStyles = makeStyles((theme) => ({
  main: {
    height: "100%",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 15,
  },
  paper: {
    height: 550,
    width: 400,
    borderRadius: 25,
  },
  header: {
    height: "10%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    height: "75%",
  },
  footer: {
    height: "15%",
    display: "flex",
    alignItems: "center",
  },
  members_container: {
    height: 500,
    width: 400,
    borderRadius: 30,
    textOverflow: "ellipsis",
  },
  new_member: {
    position: "absolute",
    top: 20,
    right: 20,
    height: 35,
    width: "auto",
    padding: 10,
    borderRadius: 30,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  item: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function Room({ user_id, username }) {
  const classes = useStyles();
  const { roomId } = useParams();
  const {
    messages,
    setMessages,
    newMember,
    setNewMember,
    members,
    setMembers,
  } = useChat(roomId, user_id);

  useEffect(() => {
    axios
      .get("/room/messages/" + roomId)
      .then(({ data }) => {
        setMessages(data.messages);
      })
      .catch((error) => alert(JSON.stringify(error, null, 2)));

    axios.get("/room/members/" + roomId).then(({ data }) => {
      setMembers(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (newMember) {
    setTimeout(() => {
      setNewMember(null);
    }, 2000);
  }

  return (
    <>
      {newMember && (
        <Paper elevation={12} className={classes.new_member}>
          <Typography variant="h5" color="primary">
            {newMember.username} has just joined.
          </Typography>
        </Paper>
      )}

      <Grid container spacing={2} className={classes.main}>
        <Grid item xs={12} md={12} lg={6} className={classes.item}>
          <RoomChat
            classes={classes}
            roomId={roomId}
            user_id={user_id}
            username={username}
            messages={messages}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={6} className={classes.item}>
          <Paper elevation={12} className={classes.members_container}>
            <Typography
              color="primary"
              style={{ textAlign: "center", margin: 10 }}
            >
              Other Members :
            </Typography>
            {members.map((member) => {
              return (
                member.id !== user_id && (
                  <h1 style={{ marginTop: 10 }}>{member.username}</h1>
                )
              );
            })}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

const mapState = (store) => {
  const { user } = store;
  return {
    user_id: user.id,
    username: user.username,
  };
};

export default connect(mapState, {})(Room);
