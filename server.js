const app = require("./app");
const http = require("http");
const config = require("./utils/config");

const server = http.createServer(app);

if (config.NODE_ENV === "production") {
  console.log = function () {};
}

server.listen(config.PORT, () => {
  console.log(`Backend Server running on PORT ${config.PORT}`);
});
