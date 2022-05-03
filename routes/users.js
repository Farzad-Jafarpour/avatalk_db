const bcrypt = require("bcrypt");
const _ = require("lodash");
const auth = require("../middleware/auth");
const express = require("express");
const { User, validate } = require("../models/user");
const admin = require("../middleware/admin");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find()
    .sort("name")
    .select([
      "name",
      "lastName",
      "isTeacher",
      "isStudent",
      "isAdmin",
      "nationalCode",
      ,
    ]);
  res.send(users);
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findOne({
    nationalCode: req.user.nationalCode,
  }).select("-password");
  res.send(user);
});

router.get("/:nationalCode", auth, async (req, res) => {
  const user = await User.findOne({
    nationalCode: req.user.nationalCode,
  }).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  let user = await User.findOne({ nationalCode: req.body.nationalCode });
  if (user) return res.status(400).send("user alrady registered");

  user = new User(
    _.pick(req.body, [
      "name",
      "lastName",
      "isTeacher",
      "isStudent",
      "isAdmin",
      "nationalCode",
      "password",
    ])
  );

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user = await user.save();

  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["name", "lastName", "nationalCode"]));
});

router.put("/:nationalCode", (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
});

router.delete("/:nationalCode", auth, admin, async (req, res) => {
  const user = await User.findOneAndRemove({
    nationalCode: req.params.nationalCode,
  });

  if (!user)
    return res
      .status(404)
      .send("The user with the given national code was not found.");

  res.send(user);
});

module.exports = router;
