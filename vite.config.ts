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
      "/api": {
        target: "http://localhost:11434", // Servidor Ollama
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
    },
  },
  optimizeDeps: {
    include: ["@heroicons/react/24/outline"], // Pré-empacota ícones
    exclude: ["@types/node"], // Evita conflitos
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/], // Melhora compatibilidade
    },
  },
});
