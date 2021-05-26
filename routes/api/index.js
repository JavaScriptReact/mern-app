const express = require("express");
const router = express.Router();
const userModel = require("../../models/users");

router.post("/users", function (req, res) {
  const { username } = req.body;

  const newUser = new userModel({
    username: username,
  });

  newUser
    .save()
    .then(() => res.send({ status: "ok" }))
    .catch((err) => res.send(err));
});

module.exports = router;
