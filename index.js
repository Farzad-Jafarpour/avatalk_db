const winston = require("winston");
const express = require("express");
const app = express();

require("./startup/logging");
require("./startup/db")();
require("./startup/routes")(app);
require("./startup/config");
const cors = require("cors");

app.use(cors());

const server = app.listen(3900, () => winston.info("Listening on port 3000"));

module.exports = server;
