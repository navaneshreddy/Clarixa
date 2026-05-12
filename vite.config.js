import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";
export default defineConfig(function (_a) {
    var command = _a.command;
    return ({
        base: command === "build" ? "/Clarixa/" : "/",
        plugins: [react(), cloudflare()],
    });
});
