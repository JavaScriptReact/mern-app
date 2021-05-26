import React, { useContext } from "react";
import { Context } from "../containers/Registration";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

function SignIn() {
  const { data, setData, signIn } = useContext(Context);

  return (
    <>
      <Typography variant="h5" color="primary" style={{ textAlign: "center" }}>
        SignIn Form
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
        You don't have an account ? SignUp{" "}
        <Link to="/authentication/sign-up">Here</Link>
      </Typography>
      <Button variant="contained" color="primary" size="large" onClick={signIn}>
        Sign In
      </Button>
    </>
  );
}

export default SignIn;
