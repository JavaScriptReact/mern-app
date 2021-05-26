import React, { useRef } from "react";
import axios from "axios";

import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

import account from "../account.png";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "50%",
    width: 45,
    height: 45,
    background: "grey",
    marginLeft: 20,
    "&:hover": {
      transform: "scale(1.1)",
      cursor: "pointer",
    },
  },
}));

function ProfileImage({ user_id, profile_image }) {
  const classes = useStyles();
  const file = useRef(null);
  const submit = useRef(null);

  const changeProfileImage = () => {
    file.current.click();
    file.current.addEventListener("change", function (value) {
      const file = value.target.files[0];
      const formData = new FormData();
      formData.append("profile_image", file);
      formData.append("user_id", user_id);
      axios.post("/upload/profile_image", formData, {
        headers: { "Content-Type": undefined },
      });
    });
  };

  return (
    <>
      <Tooltip title="profile image">
        <Paper
          elevation={10}
          className={classes.root}
          onClick={changeProfileImage}
        >
          <img
            src={profile_image || account}
            alt="Profile"
            style={{ height: "100%", width: "100%", borderRadius: "50%" }}
          />
          <form
            action="/upload/profile_image"
            method="post"
            enctype="multipart/form-data"
          >
            <input type="file" name="profile_image" hidden ref={file} />
            <input type="submit" hidden ref={submit} />
          </form>
        </Paper>
      </Tooltip>
    </>
  );
}

export default ProfileImage;
