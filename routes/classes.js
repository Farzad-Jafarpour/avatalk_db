const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const { Classroom } = require("../models/classroom");

router.get("/", async (req, res) => {
  const classroom = await Classroom.find();
  res.send(classroom);
});

router.post("/", auth, async (req, res) => {
  let classroom = new Classroom({
    numberOfSessions: req.body.numberOfSessions,
    sessions: req.body.sessions,
  });
  classroom = await classroom.save();
  res.send(classroom);
});

module.exports = router;
