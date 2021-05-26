import React, { useState } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import useChat from "../sockets/useChat";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import JoinRoom from "../components/JoinRoom";
import CreateRoom from "../components/CreateRoom";

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50% , -50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-evenly",
  height: 200,
  width: 200,
};

function HomePage({ username, id, created_at }) {
  const history = useHistory();
  const location = useLocation();
  const q = new URLSearchParams(location.search).get("q");
  const [roomName, setRoomName] = useState("");
  const { user_join } = useChat(roomName, id);

  const join = () => {
    history.push("/room?q=join");
  };

  const create = () => {
    history.push("/room?q=create");
  };

  const createRoom = () => {
    axios
      .post("/room/create", { user_id: id, room_name: roomName })
      .then(({ data }) => {
        if (data.error) {
          alert(data.error);
        } else history.push(`/room/${roomName}`);
      })
      .catch((error) => alert(JSON.stringify(error, null, 2)));
  };

  if (q === "join")
    return (
      <JoinRoom
        user_id={id}
        username={username}
        created_at={created_at}
        user_join={user_join}
      />
    );
  if (q === "create")
    return (
      <CreateRoom
        action={createRoom}
        roomName={roomName}
        setRoomName={setRoomName}
      />
    );

  return (
    <Paper elevation={12} style={styles}>
      <Typography color="primary" variant="h5">
        Choose One :
      </Typography>
      <Button color="secondary" variant="contained" onClick={create}>
        Create Room
      </Button>
      <Button color="primary" variant="contained" onClick={join}>
        Join Room
      </Button>
    </Paper>
  );
}

const mapState = (store) => {
  const user = store.user;
  return {
    username: user.username,
    id: user.id,
    created_at: user.created_at,
  };
};

export default connect(mapState, {})(HomePage);
