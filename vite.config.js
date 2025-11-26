import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://fsa-book-buddy-b6e748d1380d.herokuapp.com",
        changeOrigin: true,
      },
    },
  },
});
