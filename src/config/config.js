var environment = process.env.NODE_ENV || "development";
var config;
if (environment == "development")
    config = require("./env/development");
else if (environment == "production") {
    config = require("./env/production");
}
module.exports = config;
