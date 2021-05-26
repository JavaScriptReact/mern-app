const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const makeCookie = require("../../middleware/makeCookie");
const userModel = require("../../models/users");

router.post("/sign-in", function (req, res) {
  const { username, password } = req.body;

  userModel.findOne({ username: username }, function (error, matched) {
    if (error) return res.send({ error });
    const correctPassword = bcrypt.compareSync(password, matched.password);
    const data = {
      username: matched.username,
      password: matched.password,
      created_at: matched.created_at,
      id: matched.id,
    };
    if (correctPassword) {
      makeCookie(res, data);
      res.send({ userData: data });
    } else {
      res.send({ error: "Bad username or password" });
    }
  });
});

module.exports = router;
