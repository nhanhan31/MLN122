import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Dùng đường dẫn tương đối để bản build mở được cả khi double-click file.
export default defineConfig({
  base: "./",
  plugins: [react()],
});
