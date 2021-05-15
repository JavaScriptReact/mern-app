import React, { useState } from "react";
import ReactDom from "react-dom";
import axios from "axios";

import "./styles/styl/style.css";

function Application() {
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
}

ReactDom.render(
  <>
    <Application />
  </>,
  document.getElementById("root")
);
