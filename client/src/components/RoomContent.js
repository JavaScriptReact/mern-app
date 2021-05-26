import React, { useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    overflowX: "hidden",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: 20,
      boxShadow: "inset 0 0 5px blue",
      borderRadius: 10,
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: 10,
      background: "blue",
    },
  },
  own: {
    background: "blue",
    color: "white",
    height: "auto",
    fontSize: 18,
    fontWeight: "bold",
    borderRadius: 20,
    padding: "2px 10px",
    width: "auto",
    maxWidth: "40%",
    alignSelf: "flex-end",
    marginBottom: 10,
    marginRight: 20,
  },
  foregein: {
    background: "grey",
    color: "white",
    height: "auto",
    fontSize: 18,
    fontWeight: "bold",
    borderRadius: 20,
    padding: "2px 10px",
    maxWidth: "40%",
    alignSelf: "flex-start",
    marginBottom: 10,
    marginLeft: 20,
  },
}));

function RoomContent({ messages, user_id }) {
  const classes = useStyles();

  return (
    <section className={classes.container}>
      {messages.map((message) => {
        return (
          <div
            className={
              message.owner === user_id ? classes.own : classes.foregein
            }
          >
            {message.owner === user_id ? "You" : message.username} :{" "}
            {message.value}
          </div>
        );
      })}
    </section>
  );
}

export default RoomContent;
