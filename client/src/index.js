import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactDom from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";

import HomePage from "./containers/HomePage";
import Room from "./containers/Room";
import RegistrationForm from "./containers/Registration";
import NavBar from "./components/NavBar";

import "./styles/styl/style.css";

function Application() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (!location.pathname.includes("/authentication")) {
      axios
        .get("/user/verify")
        .then(({ data }) => {
          if (data.unLogged) {
            history.push("/authentication/sign-up");
          } else {
            setIsLogged(true);
            dispatch({
              type: "verify",
              payload: data.userData,
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      axios.get("/user/verify").then(({ data }) => {
        if (!data.unLogged) {
          history.push("/room");
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <>
      {isLogged && <NavBar />}
      <Switch>
        <Route path="/" exact>
          <Redirect to="/room" />
        </Route>
        <Route path="/room" exact>
          <HomePage />
        </Route>
        <Route path="/room/:roomId">
          <Room />
        </Route>
        <Route path="/authentication">
          <RegistrationForm />
        </Route>
        <Route path="*">
          <h1>Error Page | Error : 404 Message : Not Found</h1>
        </Route>
      </Switch>
    </>
  );
}

ReactDom.render(
  <Router>
    <Provider store={store}>
      <Application />
    </Provider>
  </Router>,
  document.getElementById("root")
);
