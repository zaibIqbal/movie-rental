const config = require("config");

module.exports = function () {
  if (!config.get("jwtPrivateKey")) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("FATAL ERROR: jwtPrivateKey not defined.");
    }

    process.env.vidly_jwtPrivateKey = "dev-jwt-private-key";
  }
};
