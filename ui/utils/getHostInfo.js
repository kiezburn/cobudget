export default function getHostInfo(req) {
  let host, protocol, subdomain;

  if (req) {
    host = req.headers["x-forwarded-host"];
    protocol = req.headers["x-forwarded-proto"];
  }

  if (typeof window !== "undefined") {
    host = window.location.host;
    protocol = window.location.protocol.slice(0, -1); // location.protocol includes a trailing `:` that we remove :)
  }

  if (host) {
    const hostParts = host.split(".");
    if (hostParts.length === (host.includes("localhost:") ? 2 : 3)) {
      subdomain = hostParts[0];
    }
  }

  return {
    subdomain,
    host,
    protocol
  };
}