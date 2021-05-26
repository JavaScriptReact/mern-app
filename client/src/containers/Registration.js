import React, { useState, createContext } from "react";
import axios from "axios";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import SignUpForm from "../components/SignUp";
import SignInForm from "../components/SignIn";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50% , -50%)",
    height: 400,
    width: 400,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    padding: 10,
    borderRadius: 25,
  },
}));

export const Context = createContext();

function Registration() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [data, setData] = useState({ username: "", password: "" });

  const signUp = () => {
    if (data.username && data.password) {
      axios.post("/user/sign-up", { ...data }).then(({ data }) => {
        if (data.error) return alert(data.error);
        dispatch({
          type: "sign-up",
          payload: data.userData,
        });
        history.push("/room");
      });
    }
  };

  const signIn = () => {
    if (data.username && data.password) {
      axios.post("/user/sign-in", { ...data }).then(({ data }) => {
        if (data.error) return alert(data.error);
        dispatch({
          type: "sign-in",
          payload: data.userData,
        });
        history.push("/room");
      });
    }
  };

  return (
    <>
      <Paper elevation={12} className={classes.root}>
        <Context.Provider value={{ data, setData, signUp, signIn }}>
          <Switch>
            <Route path="/authentication/sign-in">
              <SignInForm />
            </Route>
            <Route path="/authentication/sign-up">
              <SignUpForm />
            </Route>
            <Route path="*">
              <h1>Error : Not Found</h1>
            </Route>
          </Switch>
        </Context.Provider>
      </Paper>
    </>
  );
}

export default Registration;
