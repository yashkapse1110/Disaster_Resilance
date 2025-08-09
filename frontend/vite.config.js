import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    allowedHosts: [
      "becomes-proceeds-danish-earning.trycloudflare.com",
      "urw-phd-play-relates.trycloudflare.com",
      "nylon-html-suggest-forming.trycloudflare.com",
    ],
    historyApiFallback: true,
  },
  preview: {
    historyApiFallback: true,
  },
});
