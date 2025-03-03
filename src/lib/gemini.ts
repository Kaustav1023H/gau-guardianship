
/**
 * Google Gemini API integration utilities
 */

// Define response interface for type safety
export interface GeminiResponse {
  text: string;
  model: string;
  finishReason: string;
}

// Store API key in memory (for frontend-only apps)
let apiKey = localStorage.getItem('gemini-api-key') || '';

// Set API key
export const setGeminiApiKey = (key: string) => {
  apiKey = key;
  localStorage.setItem('gemini-api-key', key);
  return !!key;
};

// Check if API key is set
export const hasGeminiApiKey = (): boolean => {
  return !!apiKey;
};

// Clear API key
export const clearGeminiApiKey = () => {
  apiKey = '';
  localStorage.removeItem('gemini-api-key');
};

// Generate content with Gemini
export const generateContent = async (
  prompt: string,
  model: string = 'gemini-pro',
  historyContext: Array<{ role: string; content: string }> = []
): Promise<GeminiResponse> => {
  if (!apiKey) {
    throw new Error('Gemini API key not set');
  }

  try {
    // Format the history context into Gemini's expected format
    const messages = historyContext.map(item => ({
      role: item.role === 'user' ? 'user' : 'model',
      parts: [{ text: item.content }]
    }));

    // Add the current prompt
    messages.push({
      role: 'user',
      parts: [{ text: prompt }]
    });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: messages,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
            topP: 0.95,
            topK: 40
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to generate content');
    }

    const data = await response.json();
    
    // Extract the response text from the Gemini response structure
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const finishReason = data.candidates?.[0]?.finishReason || '';
    
    return {
      text: responseText,
      model,
      finishReason,
    };
  } catch (error) {
    console.error('Gemini API error:', error);
    throw error;
  }
};

// List available models
export const listGeminiModels = async (): Promise<string[]> => {
  if (!apiKey) {
    return ['gemini-pro', 'gemini-pro-vision'];
  }
  
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      return ['gemini-pro', 'gemini-pro-vision'];
    }

    const data = await response.json();
    return data.models
      .filter((model: any) => model.name.includes('gemini'))
      .map((model: any) => model.name.split('/').pop());
  } catch (error) {
    console.error('Failed to fetch Gemini models:', error);
    return ['gemini-pro', 'gemini-pro-vision'];
  }
};

