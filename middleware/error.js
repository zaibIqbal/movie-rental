// const winston = require("winston");
const logger = require("../startup/logging")();

module.exports = function (err, req, res, next) {
  // winston.error(err.message, err);
  logger.error({ message: err.message, metadata: { stack: err.stack } });
  res.status(500).send("Something went wrong.");
};
