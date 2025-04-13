import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Permite acesso externo
    port: 5173, // Porta fixa para evitar conflitos
    open: true, // Abre o navegador automaticamente
    strictPort: true, // Fecha se a porta estiver ocupada
    proxy: {
      "/api/generate": {
        target: "http://localhost:11434/api/generate",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/generate/, ""),
        configure: (proxy) => {
          proxy.on("error", (err) => {
            console.error("Proxy error:", err);
          });
          proxy.on("proxyReq", (_proxyReq, req) => {
            console.log(`Proxying request to: ${req.url}`);
          });
          proxy.on("proxyRes", (proxyRes) => {
            console.log(
              `Received response from Ollama: ${proxyRes.statusCode}`
            );
          });
        },
      },
      "/api": {
        target: "http://localhost:11434",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
        configure: (proxy) => {
          proxy.on("error", (err) => {
            console.error("Proxy error:", err);
          });
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@types": path.resolve(__dirname, "./src/types"),
    },
  },
  optimizeDeps: {
    include: [
      "@heroicons/react/24/outline",
      "sweetalert2",
      "sweetalert2-react-content",
    ], // Pré-empacota dependências importantes
    exclude: ["@types/node"], // Evita conflitos
  },
  build: {
    outDir: "dist",
    sourcemap: process.env.NODE_ENV !== "production",
    commonjsOptions: {
      include: [/node_modules/], // Melhora compatibilidade
    },
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          ui: [
            "@heroicons/react/24/outline",
            "sweetalert2",
            "sweetalert2-react-content",
          ],
        },
      },
    },
  },
  css: {
    devSourcemap: true,
    postcss: "./postcss.config.mjs",
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
});
