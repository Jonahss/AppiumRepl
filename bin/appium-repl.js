var path = require("path");

var opts = require("nomnom")
  .option("preselected", {
    position: 0,
    list: true,
    help: "Preselected profiles"
  })
  .option("profiles", {
    default: path.join(process.cwd(), ".appium-repl.json"),
    help: "Profiles file"
  })
  .option("hostname", {
    default: (process.env.SELENIUM_HOST || "localhost"),
    help: "Appium Hostname"
  })
  .option("port", {
    default: (process.env.SELENIUM_PORT || "4723"),
    help: "Appium Port"
  })
  .option("username", {
    default: process.env.SAUCE_USERNAME,
    help: "Appium Username"
  })
  .option("password", {
    default: process.env.SAUCE_ACCESS_KEY,
    help: "Appium password"
  })
  .parse();

var repl = require("../lib/appium-repl.js");
var config = {
  profiles: require(opts.profiles),
  preselectedProfile: opts[0],
  hostname: opts.hostname,
  port: opts.port,
  user: opts.username,
  pwd: opts.password
};
repl.run(config);
