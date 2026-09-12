const express = require("express");
const os = require("os");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static("public"));

app.get("/api/status", (req, res) => {
  res.json({
    status: "healthy",
    service: "kubewatch-api",
    version: process.env.APP_VERSION || "v1",
    hostname: os.hostname(),
    platform: process.platform,
    nodeVersion: process.version,
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`KubeWatch running on port ${PORT}`);
});

