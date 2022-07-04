const _ = require("lodash");
const auth = require("../middleware/auth");
const express = require("express");
const { card, validate } = require("../models/card");
const admin = require("../middleware/admin");
const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./userfiles");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
//
const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  const userCards = await UserCard.find()
    .sort("name")
    .select(["name", "description", "userCardImage"]);
  res.send(userCards);
});

router.get("/:id", async (req, res) => {
  const userCard = await UserCard.findOne({
    id: req.params.id,
  });
  res.send(userCard);
});

router.post("/userfiles", upload.single("userCardImage"), async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  res.send(req.file.path);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  console.log(req.body);
  userCard = new userCard(
    _.pick(req.body, ["name", "description", "userCardImage"])
  );

  userCard = await UserCard.save();

  res.send(_.pick(userCard, ["name", " userCardImage"]));
});

router.put("/:id", async (req, res) => {
  let userCard = await userCard.findOne({ id: req.params.id });
  // if (!userCard) return res.status(404).send("userCard not found");
  userCard.name = req.body.name;
  userCard.description = req.body.description;
  userCard.userCardImage = req.body.userCardImage;
  userCard = await UserCard.save();
  res.send(userCard);
});

// router.delete("/:nationalCode", auth, admin, async (req, res) => {
//   const user = await User.findOneAndRemove({
//     nationalCode: req.params.nationalCode,
//   });

//   if (!user)
//     return res
//       .status(404)
//       .send("The user with the given national code was not found.");

//   res.send(user);
// });

module.exports = router;
