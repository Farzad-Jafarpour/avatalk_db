const _ = require("lodash");
const auth = require("../middleware/auth");
const express = require("express");
const { Card, validate } = require("../models/card");
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
  const userCards = await Card.find()
    .sort("name")
    .select(["name", "description", "cardImage"]);
  res.send(userCards);
});

router.get("/:id", async (req, res) => {
  const card = await Card.findOne({
    id: req.params.id,
  });
  res.send(card);
});

router.post("/upload", upload.single("cardImage"), async (req, res) => {
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
  card = new Card(_.pick(req.body, ["name", "description", "cardImage"]));

  card = await card.save();

  res.send(_.pick(card, ["name", " cardImage"]));
});

router.put("/:id", async (req, res) => {
  let card = await Card.findOne({ id: req.params.id });
  // if (!card) return res.status(404).send("card not found");
  card.name = req.body.name;
  card.description = req.body.description;
  card.cardImage = req.body.cardImage;
  card = await card.save();
  res.send(card);
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
