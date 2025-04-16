const express = require("express");
const cors = require("cors")
const os = require("os");

const app = express();
const port = 7000;

app.use(cors())

app.get("/", (req, res) => {
  const systemData = {
    time: new Date().toLocaleString(),
    hostname: os.hostname(),
    ipAddress: getIpAddress(),
  };
  res.json(systemData);
});

function getIpAddress() {
  const interfaces = os.networkInterfaces();
  let ipAddress = "";
  Object.keys(interfaces).forEach((ifname) => {
    interfaces[ifname].forEach((iface) => {
      if (iface.family === "IPv4" && !iface.internal) {
        ipAddress = iface.address;
      }
    });
  });
  return ipAddress;
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
