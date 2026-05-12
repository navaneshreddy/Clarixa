import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/Clarixa/" : "/",
  plugins: [react(), cloudflare()],
}));