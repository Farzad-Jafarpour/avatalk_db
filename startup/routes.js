const express = require("express");
const users = require("../routes/users");
const auth = require("../routes/auth");
const classes = require("../routes/classes");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/classes", classes);
  app.use("/api/sessions", auth);
  app.use("/api/auth", auth);
  app.use(error);
};
