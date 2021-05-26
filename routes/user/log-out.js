const router = require("express").Router();

router.post("/user/log-out", function (req, res) {
  const { token } = req.cookies;
  console.log(token);

  res.clearCookie("token", {
    path: "/",
    httpOnly: true,
  });
  res.send();
});

module.exports = router;
