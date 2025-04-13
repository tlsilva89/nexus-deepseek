// src/api/ollama.ts

export interface OllamaRequest {
  model: string;
  prompt: string;
  stream?: boolean;
  options?: {
    temperature?: number;
    top_p?: number;
    num_ctx?: number;
  };
}

export interface OllamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
  context?: number[];
  total_duration?: number;
  load_duration?: number;
  prompt_eval_count?: number;
  prompt_eval_duration?: number;
  eval_count?: number;
  eval_duration?: number;
}

export const generateResponse = async (
  data: OllamaRequest
): Promise<OllamaResponse> => {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        options: {
          temperature: 0.7,
          num_ctx: 2048,
          ...data.options,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to generate response");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to communicate with Ollama API"
    );
  }
};
