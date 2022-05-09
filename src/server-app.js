const config = require("./config.json");
const { main } = require("./main");

setInterval(() => main(), config.serverRunningInterval);
