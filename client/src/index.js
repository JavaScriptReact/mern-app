import React from "react";
import ReactDom from "react-dom";

import "./styles/styl/style.css";

function Application() {
  return (
    <section>
      <h1>This web has created by MERN.</h1>
    </section>
  );
}

ReactDom.render(
  <>
    <Application />
  </>,
  document.getElementById("root")
);
