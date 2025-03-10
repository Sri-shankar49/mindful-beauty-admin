// import path from "path"
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// })

import { fileURLToPath } from "url";
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// Fix for ESM environments
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Enables `@` as an alias for `src/`
    },
  },
});

