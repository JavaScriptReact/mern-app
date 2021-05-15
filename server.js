const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server is listening on PORT ", PORT));
