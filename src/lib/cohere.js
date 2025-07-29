// Placeholder for cohere utility
// Replace with real implementation if needed

export async function getSuggestions(input) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('Cohere API key not set in VITE_OPENAI_API_KEY');
  }
  if (!input || (typeof input !== 'string' && typeof input !== 'object')) {
    throw new Error('Prompt (input) must be a non-empty string or object.');
  }
  const prompt = typeof input === 'string' ? input : JSON.stringify(input);
  const response = await fetch('https://api.cohere.ai/v1/generate', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'command',
      prompt,
      max_tokens: 50,
      temperature: 0.7
    })
  });
  const data = await response.json();
  if (!response.ok) {
    console.error('Cohere API Error:', data);
    throw new Error(data.message || JSON.stringify(data));
  }
  return data.generations || [];
}


