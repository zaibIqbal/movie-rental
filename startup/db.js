const mongoose = require("mongoose");
const logger = require("./logging")();

module.exports = function () {
  mongoose
    .connect("mongodb://127.0.0.1/vidly")
    .then(() => logger.info({ message: "Connected to Mongodb..." }));
};
