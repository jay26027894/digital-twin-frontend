// Placeholder for cohere utility
// Replace with real implementation if needed

export async function getSuggestions(input) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('Cohere API key not set in VITE_COHERE_API_KEY');
  }
  const response = await fetch('https://api.cohere.ai/v1/generate', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'command',
      prompt: input,
      max_tokens: 50,
      temperature: 0.7
    })
  });
  const data = await response.json();
  return data.generations || [];
}

