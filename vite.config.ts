import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { profile } from "./src/content/profile";
import { seo } from "./scripts/seo";

export default defineConfig(({ mode }) => {
  // Set VITE_SITE_URL (e.g. in Vercel) once the final domain is known.
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const siteUrl = env.VITE_SITE_URL || process.env.VITE_SITE_URL || profile.links.portfolio;

  return {
    plugins: [react(), seo(siteUrl)],
    resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
    build: { chunkSizeWarningLimit: 1400 },
  };
});
