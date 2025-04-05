
import { GenerateRecipesParams } from "@/types/AIProvider";

export const generateRecipes = async (
  apiKey: string,
  params: GenerateRecipesParams
): Promise<string> => {
  if (!apiKey) {
    throw new Error("API key is required");
  }

  const { foodPrompt, additionalRequirements, healthCondition, modelProvider, model, customEndpoint } = params;

  let prompt = `Create 3 detailed and unique recipes for ${foodPrompt}.`;
  
  if (healthCondition) {
    prompt += ` These recipes should be suitable for people with ${healthCondition} and include specific health benefits related to this condition.`;
  } else {
    prompt += ` Include the health benefits of these recipes.`;
  }
  
  if (additionalRequirements) {
    prompt += ` Additional requirements: ${additionalRequirements}.`;
  }
  
  prompt += `
For each recipe, include:
1. A creative title
2. List of ingredients with measurements
3. Step-by-step cooking instructions
4. Health benefits
5. Special considerations for people with health conditions

Format each recipe with clear sections for ingredients, instructions, health benefits, and special considerations.`;

  try {
    let endpoint: string;
    let requestBody: Record<string, any>;
    let headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };

    // Configure request based on the selected provider
    switch (modelProvider) {
      case 'openai':
        endpoint = 'https://api.openai.com/v1/chat/completions';
        requestBody = {
          model: model || 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: 'You are AstroChef, an AI specializing in creating healthy, delicious recipes with detailed health benefits. You consider dietary restrictions and medical conditions when creating recipes. Your responses should be detailed, accurate, and focused on nutrition and health benefits.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2500
        };
        break;
        
      case 'anthropic':
        endpoint = 'https://api.anthropic.com/v1/messages';
        requestBody = {
          model: model || 'claude-3-opus',
          system: 'You are AstroChef, an AI specializing in creating healthy, delicious recipes with detailed health benefits.',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 2500
        };
        headers = {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        };
        break;
        
      case 'google':
        // Fixed Google AI Gemini API format
        endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/' + (model || 'gemini-1.5-pro') + ':generateContent';
        headers = {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        };
        requestBody = {
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: "You are AstroChef, an AI specializing in creating healthy, delicious recipes with detailed health benefits.\n\n" + prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2500
          }
        };
        break;
        
      case 'custom':
        if (!customEndpoint) {
          throw new Error("Custom API endpoint is required");
        }
        endpoint = customEndpoint;
        requestBody = {
          prompt: prompt,
          model: model || 'custom',
          max_tokens: 2500
        };
        break;
        
      default:
        throw new Error("Unsupported AI provider");
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to generate recipes');
    }

    const data = await response.json();
    
    // Extract content based on provider response format
    let content: string;
    
    switch (modelProvider) {
      case 'openai':
        content = data.choices[0].message.content;
        break;
      case 'anthropic':
        content = data.content[0].text;
        break;
      case 'google':
        // Updated response parsing for Google Gemini API
        content = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                 data.text || 
                 JSON.stringify(data);
        break;
      case 'custom':
        content = data.content || data.generated_text || data.text || JSON.stringify(data);
        break;
      default:
        content = JSON.stringify(data);
    }
    
    return content;
  } catch (error) {
    console.error('Error generating recipes:', error);
    throw error;
  }
};
