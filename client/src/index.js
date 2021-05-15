import React from "react";
import ReactDom from "react-dom";

function Application() {
  return (
    <>
      <h1>This web has created by MERN.</h1>
    </>
  );
}

ReactDom.render(
  <>
    <Application />
  </>,
  document.getElementById("root")
);
