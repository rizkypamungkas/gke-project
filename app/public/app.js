const elements = {
  healthStatus: document.getElementById("healthStatus"),
  systemStatus: document.getElementById("systemStatus"),
  apiStatus: document.getElementById("apiStatus"),

  serviceName: document.getElementById("serviceName"),
  version: document.getElementById("version"),

  hostname: document.getElementById("hostname"),
  platform: document.getElementById("platform"),
  nodeVersion: document.getElementById("nodeVersion"),
  uptime: document.getElementById("uptime"),

  podHostname: document.getElementById("podHostname"),
  lastCheck: document.getElementById("lastCheck")
};


function formatUptime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  }

  return `${secs}s`;
}


function updateLastCheck() {
  const now = new Date();

  elements.lastCheck.textContent =
    now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
}


async function loadStatus() {

  try {

    const response = await fetch("/api/status");

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();


    // Application status

    elements.healthStatus.textContent =
      data.status.toUpperCase();

    elements.systemStatus.textContent =
      "SYSTEM ONLINE";

    elements.apiStatus.textContent =
      "CONNECTED";


    // Workload

    elements.serviceName.textContent =
      data.service;

    elements.version.textContent =
      data.version;


    // Runtime

    elements.hostname.textContent =
      data.hostname;

    elements.platform.textContent =
      data.platform;

    elements.nodeVersion.textContent =
      data.nodeVersion;

    elements.uptime.textContent =
      formatUptime(data.uptime);


    // Kubernetes preview

    elements.podHostname.textContent =
      data.hostname;


    updateLastCheck();

  } catch (error) {

    console.error(error);

    elements.healthStatus.textContent =
      "UNHEALTHY";

    elements.systemStatus.textContent =
      "SYSTEM OFFLINE";

    elements.apiStatus.textContent =
      "DISCONNECTED";

  }

}

// Initial request
loadStatus();

// Refresh every 5 seconds
setInterval(loadStatus, 5000);

