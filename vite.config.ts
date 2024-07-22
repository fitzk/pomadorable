import { ManifestV3Export, crx } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import manifest from "./manifest.json";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [
    react(),
    crx({
      contentScripts: {
        injectCss: true,
      },
      manifest: manifest as ManifestV3Export,
    }),
  ],
  resolve: {
    alias: {
      "@assets": "./src/_assets",
    },
  },
});
