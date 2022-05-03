const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  lastName: { type: String, required: true, minlength: 5, maxlength: 50 },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  sessionAttendance: [Boolean],
  nationalCode: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 10,
  },
  isTeacher: Boolean,
  isAdmin: Boolean,
  isStudent: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  // returns the generated token

  return jwt.sign(
    {
      nationalCode: this.nationalCode,
      isAdmin: this.isAdmin,
      isTeacher: this.isTeacher,
      isStudent: this.isStudent,
      name: this.name,
      lastName: this.lastName,
    },
    config.get("jwtPrivateKey")
  );
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(25).required(),
    lastName: Joi.string().min(5).max(25).required(),
    nationalCode: Joi.string().min(10).max(10).required(),
    password: Joi.string().min(5).max(255).required(),
    isAdmin: Joi.boolean(),
    isStudent: Joi.boolean(),
    isTeacher: Joi.boolean(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
