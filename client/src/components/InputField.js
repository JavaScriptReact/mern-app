import React from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = {
  display: "flex",
  height: "100%",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
};

function InputField({ setMessage, message, send }) {
  return (
    <>
      <section style={styles}>
        <TextField
          type="text"
          value={message}
          label="Message"
          placeholder="write message..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && send()}
        />
        <Button
          style={{ height: "50%" }}
          variant="contained"
          color="primary"
          size="small"
          onClick={send}
        >
          Send
        </Button>
      </section>
    </>
  );
}

export default InputField;
