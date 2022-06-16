const _ = require("lodash");
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

const upload = multer({ storage: storage });
// router.get("/", async (req, res) => {
//   const users = await User.find()
//     .sort("name")
//     .select([
//       "name",
//       "lastName",
//       "isTeacher",
//       "isStudent",
//       "isAdmin",
//       "nationalCode",
//       ,
//     ]);
//   res.send(users);
// });

// router.get("/me", auth, async (req, res) => {
//   const user = await User.findOne({
//     nationalCode: req.user.nationalCode,
//   }).select("-password");
//   res.send(user);
// });

// router.get("/:nationalCode", auth, async (req, res) => {
//   const user = await User.findOne({
//     nationalCode: req.user.nationalCode,
//   }).select("-password");
//   if (!user) return res.status(404).send("user not found");
//   res.send(user);
// });

router.post("/", upload.single("cardImage"), async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  // let card = await Card.findOne({ nationalCode: req.body.nationalCode });
  // if (card) return res.status(400).send("user already registered");

  card = new Card(_.pick(req.body, ["name", "description"]));

  card = await card.save();

  // const token = user.generateAuthToken();

  res.send(_.pick(card, ["name"]));
});

// router.put("/:nationalCode", async (req, res) => {
//   const { error } = validate(req.user);
//   if (error) return res.status(400).send(error.details[0].message);

//   let user = await User.findOne({ nationalCode: req.params.nationalCode });
//   if (!user) return res.status(404).send("user not found");

//   user.name = req.body.name;
//   user.lastName = req.body.lastName;
//   user.nationalCode = req.body.nationalCode;
//   user.isAdmin = req.body.isAdmin;
//   user.isTeacher = req.body.isTeacher;
//   user.isStudent = req.body.isStudent;
//   if (user.password) user.password = user.password;
//   user = await user.save();
// });

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
