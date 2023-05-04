const _ = require("lodash");
const fs = require("fs");
const auth = require("../middleware/auth");
const express = require("express");
const { CarouselImage, validate } = require("../models/carouselImage");
const router = express.Router();

router.get("/", async (req, res) => {
  const carouselImages = await CarouselImage.find()
    .sort("imageName")
    .select(["imageName"]);
  res.send(carouselImages);
});

// router.get("/:id", async (req, res) => {
//   const card = await Card.findOne({
//     _id: req.params.id,
//   });
//   res.send(card);
// });

// router.get("/:nationalCode", auth, async (req, res) => {
//   const user = await User.findOne({
//     nationalCode: req.user.nationalCode,
//   }).select("-password");
//   if (!user) return res.status(404).send("user not found");
//   res.send(user);
// });

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  // let card = await Card.findOne({ nationalCode: req.body.nationalCode });
  // if (card) return res.status(400).send("user already registered");
  console.log(req.body);
  carouselImage = new CarouselImage(_.pick(req.body, ["imageName"]));

  carouselImage = await carouselImage.save();

  // const token = user.generateAuthToken();
  // res.send(req.file.path);
  res.send(_.pick(carouselImage, ["imageName"]));
});

module.exports = router;
