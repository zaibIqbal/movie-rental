require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");

module.exports = function () {
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "exception.log" })
  );

  process.on("unhandledRejection", (ex) => {
    // console.log("We caught unhandled rejection.");
    // logger.error({ message: ex.message, metadata: { stack: ex.stack } });
    // process.exit(1);
    throw ex;
  });

  return winston.createLogger({
    format: winston.format.json(),
    // format: winston.format.combine(
    //   // winston.format.json(),
    //   winston.format.errors({ stack: true }),
    //   winston.format.timestamp(),
    //   winston.format.printf(({ level, message, timestamp, stack }) => {
    //     return `${timestamp} ${level}: ${message} - ${stack}`;
    //   }),
    //   winston.format.metadata()
    // ),

    transports: [
      new winston.transports.Console({ level: "info" }),
      new winston.transports.File({ filename: "logfile.log", level: "error" }),
      new winston.transports.MongoDB({
        db: "mongodb://127.0.0.1/vidly",
        level: "error",
      }),
    ],
  });
};
