const mongoose = require("mongoose");
const { Schema } = mongoose;

const sessionSchema = new Schema({
  users: [
    {
      _id: { type: String, required: true },
      isPresent: { type: Boolean, required: true },
    },
  ],
});

const Session = mongoose.model("Session", sessionSchema);

function validateSession(session) {
  const schema = {
    name: Joi.required().string().min(5).max(25),
    lastName: Joi.required().string().min(5).max(25),
    nationalCode: Joi.required().number().min(10).max(10),
    password: Joi.string().min(6).max(255),
  };

  return Joi.validate(session, schema);
}

exports.Session = Session;
exports.validate = validateSession;
