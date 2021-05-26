const multer = require("multer");
const router = require("express").Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/upload/profile-image",
  upload.single("avarar"),
  function (req, res) {
    console.log(req.file);
    res.send("Success");
  }
);

module.exports = router;
