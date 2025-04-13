export interface OllamaRequest {
  model: string;
  prompt: string;
  stream?: boolean;
}

export interface OllamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}

export const generateResponse = async (
  data: OllamaRequest
): Promise<OllamaResponse> => {
  const response = await fetch("/ollama/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
      options: {
        temperature: 0.7,
        num_ctx: 2048,
      },
    }),
  });

  if (!response.ok) throw new Error(await response.text());
  return response.json();
};
