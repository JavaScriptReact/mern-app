const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const roomModel = require("./models/room");
const userModel = require("./models/users");

const mongo_uri = require("./config").MONGODB_URI;
const PORT = require("./config").PORT;
const api = require("./routes/api");
const client_options = {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
};

mongoose
  .connect(mongo_uri, client_options)
  .then(() => console.log("Database connected..."));

/**
 * @registration { sing-in , sign-up , verify }
 */

const sign_up = require("./routes/user/sign-up");
const sign_in = require("./routes/user/sign-in");
const verify = require("./routes/user/verify");
const log_out = require("./routes/user/log-out");
const room = require("./routes/room");
const images = require("./routes/images");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  const { roomId } = socket.handshake.query;

  socket.join(roomId);

  socket.on("USER_JOIN", (data) => {
    io.to(roomId).emit("USER_JOIN", data);
  });

  socket.on("NEW_MESSAGE", (message) => {
    const { value, user_id, room, username } = message;

    roomModel
      .findOneAndUpdate(
        { room_name: room },
        {
          $push: {
            messages: {
              value: value,
              owner: user_id,
              username: username,
            },
          },
        }
      )
      .then(() =>
        io.to(roomId).emit("NEW_MESSAGE", { value, owner: user_id, username })
      );
  });
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client", "build")));

app.use("/api", api);
app.use("/user", verify, sign_up, sign_in, log_out);
app.use("/room", room);
app.use("/images", images);

const multer = require("multer");
const profile_image_schema = require("./models/profile_image");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/uploads/:imageName", function (req, res) {
  const { imageName } = req.body;
  res.sendFile(imageName);
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

function takeItToUser(req, res, next) {
  const { user_id } = req.body;
  const id = require("crypto").randomBytes(20).toString("hex");
  req.id = id;

  userModel
    .findOneAndUpdate(
      { id: user_id },
      {
        $set: {
          profileImageId: id,
        },
      }
    )
    .then(() => next())
    .catch((error) => console.log(error));
}

app.post(
  "/upload/profile_image",
  upload.single("profile_image"),
  takeItToUser,
  function (req, res) {
    const id = req.id;
    const posted_at = new Date().getTime();

    const newProfileImage = new profile_image_schema({
      id,
      posted_at,
      url: req.file.path,
    });

    newProfileImage
      .save()
      .then((result) => res.send(file))
      .catch((error) => res.status(400).send({ error }));
  }
);

server.listen(PORT, () => console.log("Server is listening on PORT ", PORT));
