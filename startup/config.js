const config = require("config");

if (!config.get("jwtPrivateKey")) {
  throw new Error("fatal error: jwtPrivateKey is not defined");
}
