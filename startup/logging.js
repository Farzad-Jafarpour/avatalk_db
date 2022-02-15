const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({
      filename: "uncaughtExceprions.log",
    })
  );

  process.on("unhandledRecection", (ex) => {
    throw ex;
  });

  winston.add(
    new winston.transports.File({
      filename: "logFile.log",
      handleExceptions: true,
    })
  );
  winston.add(
    new winston.transports.MongoDB({ db: "mongodb://127.0.0.1/avatalk" })
  );
};
