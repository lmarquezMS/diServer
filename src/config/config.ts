var environment = process.env.NODE_ENV || "development";
var config: any;
if (environment == "development")
  config = require("./env/development");
else if (environment == "production"){
   config = require("./env/production");
}

export = config;
