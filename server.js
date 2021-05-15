const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const userModel = require("./models/users");

const mongo_uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://mern-app:LukasEK2006@cluster0.daepu.mongodb.net/Database?retryWrites=true&w=majority";

mongoose
  .connect(mongo_uri, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Mongoose connected..."));

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client", "build")));

app.get("/api/users", function (req, res) {
  res.header("Content-Type", "application/json");
  userModel.find({}, function (error, content) {
    if (error) return res.send({ error: "404", message: "Not Found" });
    res.send(JSON.stringify(content, null, 2));
  });
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.post("/api/usernames", function (req, res) {
  const username = req.body.value;
  const id = require("crypto").randomBytes(20).toString("hex");

  const newUser = new userModel({
    username: username,
    created_at: -1,
    id: id,
  });

  newUser
    .save()
    .then(() => console.log("Success"))
    .catch(() => console.log("bad"));

  res.send(newUser);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server is listening on PORT ", PORT));
