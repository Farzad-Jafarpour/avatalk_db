const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const express = require("express");
const { User } = require("../models/user");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  let user = await User.findOne({ nationalCode: req.body.nationalCode });
  if (!user) return res.status(400).send("Invalid username or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Invalid username or password");

  const token = user.generateAuthToken();
  res.send(token);
});

function validate(req) {
  const schema = Joi.object({
    nationalCode: Joi.string().min(10).max(10).required(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}

module.exports = router;
