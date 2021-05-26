const express = require("express");
const router = express.Router();

const roomModel = require("../../models/room");
const userModel = require("../../models/users");

function checkDuplicate(req, res, next) {
  const { room_name } = req.body;

  roomModel
    .findOne({ room_name: room_name })
    .then((duplicate) => {
      if (duplicate) {
        return res.send({ error: "Room already exists" });
      }
      next();
    })
    .catch((error) => res.status(400).send(error));
}

router.post("/create", checkDuplicate, function (req, res) {
  const { room_name, user_id } = req.body;
  const code = require("crypto").randomBytes(20).toString("hex");

  if (room_name) {
    const newRoom = new roomModel({
      room_name: room_name,
      created_at: -1,
      code: code,
      users: [user_id],
      messages: [],
      admin: user_id,
    });

    newRoom.save().then((result) => res.send(result));
  } else {
    res.send({ error: "Room name is not specified." });
  }
});

router.post("/join", function (req, res) {
  const { code, room_name, user_id } = req.body;

  roomModel
    .findOneAndUpdate(
      { room_name: room_name },
      {
        $addToSet: {
          users: user_id,
        },
      }
    )
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(400).send({ error: "Room doesn't exists." });
      }
    })
    .catch((error) => res.status(400).send(error));
});

router.get("/member/:id", function (req, res) {
  const { id } = req.params;
  userModel
    .findOne({ id: id })
    .select("username id created_at -_id")
    .exec(function (error, data) {
      if (error) return res.status(400).send(error);
      res.send(data);
    });
});

router.get("/members/:room_name", function (req, res) {
  const { room_name } = req.params;
  roomModel.findOne({ room_name: room_name }, function (error, content) {
    if (error) return res.status(400).send(error);
    const data = content.users;
    userModel
      .find({ id: { $in: data } })
      .select("username id created_at -_id")
      .exec(function (error, content) {
        if (error) return res.status(400).send(error);
        res.send(content);
      });
  });
});

router.get("/messages/:roomId", function (req, res) {
  const { roomId } = req.params;
  roomModel
    .findOne({ room_name: roomId })
    .select("messages -_id")
    .exec(function (error, content) {
      if (error) return res.status(400).send(error);
      res.send(content);
    });
});

module.exports = router;
