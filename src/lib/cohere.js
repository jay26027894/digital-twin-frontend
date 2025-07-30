const VITE_COHERE_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const getSuggestions = async (prompt) => {
  if (!VITE_COHERE_API_KEY) {
    throw new Error("VITE_OPENAI_API_KEY is not set in .env file");
  }

  try {
    const response = await fetch('https://api.cohere.ai/v1/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VITE_COHERE_API_KEY}`,
        'Cohere-Version': '2022-12-06',
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 1000,
        temperature: 0.7,
        k: 0,
        p: 0.75,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop_sequences: [],
        return_likelihoods: 'NONE'
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Cohere API error: ${errorData.message}`);
    }

    const data = await response.json();
    return data.generations.map(gen => gen.text.trim());
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
};
