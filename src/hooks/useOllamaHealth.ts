import { useEffect } from "react";
import { MySwal } from "../utils/sweetAlertConfig";

export const useOllamaHealth = () => {
  useEffect(() => {
    const checkOllama = async () => {
      try {
        const response = await fetch("http://localhost:11434");
        if (!response.ok) throw new Error("Servidor Ollama não respondeu");
      } catch (error: unknown) {
        console.error("Erro na verificação do Ollama:", error);
        MySwal.fire({
          icon: "warning",
          title: "Ollama não detectado!",
          html: `
            <div class="text-left">
              <p>Execute no terminal:</p>
              <code class="block bg-black p-2 mt-2 rounded">ollama serve</code>
              <p class="mt-4">Certifique-se que o modelo está instalado:</p>
              <code class="block bg-black p-2 mt-2 rounded">ollama run deepseek-r1:8b</code>
            </div>
          `,
        });
      }
    };

    checkOllama();
  }, []);
};
