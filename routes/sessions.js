const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();
const { Session } = require("../models/session");

router.get("/", async (req, res) => {
  const sessions = await Session.find();
  res.send(sessions);
});

router.post("/", [auth, admin], async (req, res) => {
  let session = new Session({
    users: req.body.users,
  });

  session = await session.save();
  res.send(session);
});
router.put("/:id", auth, async (req, res) => {
  let session = await Session.findById(req.body._id);
  if (!session) return res.status(400).send("Invalid session.");

  session.users = req.body.users;

  session = await session.save();
  res.send(session);
});

module.exports = router;
