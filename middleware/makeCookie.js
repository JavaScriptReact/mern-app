const jwt = require("jsonwebtoken");
const jwt_secret = require("../config/index").JWT_SECRET;

function makeCookie(res, data) {
  const token = jwt.sign(data, jwt_secret);
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    sameSite: true,
    maxAge: 1000 * 24 * 60 * 60,
  });
}

module.exports = makeCookie;
