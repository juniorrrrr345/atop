import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve("./client/src"),
      "@/components": path.resolve("./client/src/components"),
      "@/pages": path.resolve("./client/src/pages"),
      "@/lib": path.resolve("./client/src/lib"),
      "@/hooks": path.resolve("./client/src/hooks"),
      "@shared": path.resolve("./shared"),
      "@assets": path.resolve("./attached_assets"),
    },
  },
  root: "./client",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
