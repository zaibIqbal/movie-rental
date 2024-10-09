const express = require("express");
const genres = require("../routers/genres");
const customers = require("../routers/customers");
const movies = require("../routers/movies");
const rentals = require("../routers/rentals");
const users = require("../routers/users");
const auth = require("../routers/auth");
const home = require("../routers/home");
const error = require("../middleware/error");
const logger = require("../middleware/logger");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/", home);
  app.use(error);
};
