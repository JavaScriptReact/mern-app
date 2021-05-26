import React, { useContext } from "react";
import { Context } from "../containers/Registration";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

function SignUp() {
  const { data, setData, signUp } = useContext(Context);

  return (
    <>
      <Typography variant="h5" color="primary" style={{ textAlign: "center" }}>
        SignUp Form
      </Typography>
      <TextField
        type="text"
        label="Username"
        placeholder="write ..."
        value={data.username}
        onChange={(e) => setData({ ...data, username: e.target.value })}
      />
      <TextField
        type="password"
        label="Password"
        placholder="write ..."
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />
      <Typography variant="h6" style={{ textAlign: "center" }}>
        You already have an account ? Sign-In
        <Link to="/authentication/sign-in">Here</Link>
      </Typography>
      <Button variant="contained" color="primary" size="large" onClick={signUp}>
        Sign Up
      </Button>
    </>
  );
}

export default SignUp;
