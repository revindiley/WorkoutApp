import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The site is served from https://<user>.github.io/WorkoutApp/, so assets need that base path.
export default defineConfig({
  plugins: [react()],
  base: "/WorkoutApp/",
});
