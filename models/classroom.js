const mongoose = require("mongoose");
const { Schema } = mongoose;

const classSchema = new Schema({
  numberOfSessions: String,
  name: String,
  sessions: [],
});

const Classroom = mongoose.model("Classroom", classSchema);

exports.Classroom = Classroom;
