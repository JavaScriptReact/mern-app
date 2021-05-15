import React, { useState } from "react";
import ReactDom from "react-dom";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./styles/styl/style.css";

function Application() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="*">
        <h1>Error Page | Error : 404 Message : Not Found</h1>
      </Route>
    </Switch>
  );
}

const Home = () => {
  const [value, setValue] = useState("");

  const send = () => {
    axios
      .post("/api/usernames", { value: value })
      .then(() => setValue(""))
      .catch((error) => alert(error));
  };
  return (
    <section>
      <label htmlFor="input">Username : </label>
      <input
        type="text"
        id="input"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button type="button" onClick={send}>
        Send
      </button>
      <a href="/api/users">Application API</a>
    </section>
  );
};

ReactDom.render(
  <Router>
    <Application />
  </Router>,
  document.getElementById("root")
);
