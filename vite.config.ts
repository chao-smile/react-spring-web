import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": `${__dirname}/src`,
      "@components": `${__dirname}/src/components`,
      "@utils": `${__dirname}/src/utils`,
    },
  },
});
