import qrcode from "qrcode-terminal";
import { createServer } from "vite";

const port = Number(process.env.PORT || 5173);

const server = await createServer({
  server: {
    host: true,
    port,
  },
});

await server.listen();

const networkUrl = server.resolvedUrls?.network?.[0];
const localUrl = server.resolvedUrls?.local?.[0];

server.printUrls();

if (networkUrl) {
  console.log("\nScan this QR code on your phone:\n");
  qrcode.generate(networkUrl, { small: true });
  console.log(`\nNetwork URL: ${networkUrl}\n`);
} else if (localUrl) {
  console.log(`\nNo network URL was detected. Local URL: ${localUrl}\n`);
}

const shutdown = async () => {
  await server.close();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
