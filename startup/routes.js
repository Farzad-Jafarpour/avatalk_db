const express = require("express");
const users = require("../routes/users");
const auth = require("../routes/auth");
const classes = require("../routes/classes");
const sessions = require("../routes/sessions");
const error = require("../middleware/error");
const cards = require("../routes/cards");

module.exports = function (app) {
  app.use(express.json());
  app.use("/files", express.static("files"));
  app.use("/userfiles", express.static("userfiles"));
  app.use("/api/users", users);
  app.use("/api/cards", cards);
  app.use("/api/classes", classes);
  app.use("/api/sessions", sessions);
  app.use("/api/auth", auth);
  app.use(error);
};
