const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const jwt_secret = require("../../config/index").JWT_SECRET;

router.get("/verify", function (req, res) {
  const { token } = req.cookies;

  jwt.verify(token, jwt_secret, function (error, decoded) {
    if (error) return res.send({ unLogged: true });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.send({ unLogged: false, userData: decoded });
  });
});

module.exports = router;
