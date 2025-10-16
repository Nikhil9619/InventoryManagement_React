// import { defineConfig } from 'vite'
// 
// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//   ],
// })

// import { defineConfig } from "vite"
// import react from "@vitejs/plugin-react"
// import tailwindcss from '@tailwindcss/vite'
// import path from "path"

// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//   ],
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// })


// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";
// import tailwindcss from 'tailwindcss'; // Tailwind itself, not @tailwindcss/vite

// export default defineConfig({
//   plugins: [
//     react(),
//   ],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   css: {
//     postcss: {
//       plugins: [tailwindcss()],
//     },
//   },
// });


// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // ✅ New plugin for Tailwind v4
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});


