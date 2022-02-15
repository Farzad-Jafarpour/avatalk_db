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
  const schema = {};

  return Joi.validate(session, schema);
}

exports.Session = Session;
exports.validate = validateSession;
