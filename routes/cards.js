const _ = require("lodash");
const fs = require("fs");
const auth = require("../middleware/auth");
const express = require("express");
const { Card, validate } = require("../models/card");
const admin = require("../middleware/admin");
const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
//
const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  const cards = await Card.find()
    .sort("name")
    .select(["name", "description", "cardImage"]);
  res.send(cards);
});

router.get("/:id", async (req, res) => {
  const card = await Card.findOne({
    _id: req.params.id,
  });
  res.send(card);
});

// router.get("/:nationalCode", auth, async (req, res) => {
//   const user = await User.findOne({
//     nationalCode: req.user.nationalCode,
//   }).select("-password");
//   if (!user) return res.status(404).send("user not found");
//   res.send(user);
// });

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
  // let card = await Card.findOne({ nationalCode: req.body.nationalCode });
  // if (card) return res.status(400).send("user already registered");
  console.log(req.body);
  card = new Card(_.pick(req.body, ["name", "description", "cardImage"]));

  card = await card.save();

  // const token = user.generateAuthToken();
  // res.send(req.file.path);
  res.send(_.pick(card, ["name", " cardImage"]));
});

router.put("/:id", async (req, res) => {
  // const { error } = validate(req.user);
  // if (error) return res.status(400).send(error.details[0].message);

  let card = await Card.findOne({ _id: req.params.id });
  console.log(card._id);
  // if (!card) return res.status(404).send("card not found");
  card.name = req.body.name;
  card.description = req.body.description;
  card.cardImage = req.body.cardImage;
  card = await card.save();
  res.send(card);
});

router.delete("/files/:imageToBeDeleted", async (req, res) => {
  console.log(req.params.imageToBeDeleted);
  fs.unlink(`./files/${req.params.imageToBeDeleted}`, (err) => {
    if (err) console.log(err.message);
    else res.send("Deleting succeded");
  });
  // res.send(asgar);
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
