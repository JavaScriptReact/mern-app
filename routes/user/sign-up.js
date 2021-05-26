const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const makeCookie = require("../../middleware/makeCookie");
const userModel = require("../../models/users");

function checkDuplicate(req, res, next) {
  const { username } = req.body;
  userModel.findOne({ username : username })
    .then( ( duplicate ) => {
      if ( duplicate ) return res.send( { error: "This username is already has been taken." } )
      next()
   })
}

function makePassword(req, res, next) {
  const { password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  req.hashedPassword = hashedPassword;
  next();
}

router.post("/sign-up", checkDuplicate, makePassword, function (req, res) {
  const username = req.body.username;
  const password = req.hashedPassword;
  const id = require("crypto").randomBytes(20).toString("hex");
  const date = new Date().getTime();
  const model = new userModel({ username, password, id });

  model
    .save()
    .then((result) => {
      makeCookie(res, {
        username,
        password,
        created_at: result.created_at,
        id: result.id,
      });
      res.send({ userData: result });
    })
    .catch((error) =>
      res.send({
        status: "failed",
        message: "Cannot store you in databse.",
        error,
      })
    );
});

module.exports = router;
