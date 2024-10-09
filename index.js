const express = require("express");
const winston = require("winston");
const app = express();

const logger = require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validateion")();
// process.on("uncaughtException", (ex) => {
//   // console.log("We caught uncaught exception.");
//   logger.error(ex.message, ex);
//   process.exit(1);
// });

// const p = Promise.reject(new Error("rejected"));

// throw new Error("something fucked up");

// winston.add(new winston.transports.File({ filename: "logfile.log" }));

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info({ message: `Listening on port ${port}` }));

//To set Environment Variables use this command
//$env:vidly_jwtPrivateKey="privateKey"
