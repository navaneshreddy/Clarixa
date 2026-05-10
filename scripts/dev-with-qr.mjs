import qrcode from "qrcode-terminal";
import { networkInterfaces } from "node:os";
import { createServer } from "vite";

const port = Number(process.env.PORT || 5173);

const getLanUrls = () =>
  Object.values(networkInterfaces())
    .flat()
    .filter((net) => net?.family === "IPv4" && !net.internal)
    .map((net) => `http://${net.address}:${port}/`);

const server = await createServer({
  server: {
    host: "0.0.0.0",
    port,
  },
});

await server.listen();

const networkUrl = server.resolvedUrls?.network?.[0];
const localUrl = server.resolvedUrls?.local?.[0];
const fallbackNetworkUrl = getLanUrls()[0];
const liveUrl = networkUrl || fallbackNetworkUrl;

server.printUrls();

if (liveUrl) {
  console.log("\nScan this QR code on your phone:\n");
  qrcode.generate(liveUrl, { small: true });
  console.log(`\nLive link: ${liveUrl}\n`);
} else if (localUrl) {
  console.log(`\nNo network URL was detected. Local URL: ${localUrl}\n`);
}

const shutdown = async () => {
  await server.close();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
