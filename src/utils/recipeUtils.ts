
import { Recipe } from '@/types/Recipe';

// Parse the AI response into recipe objects
export const parseRecipes = (content: string): Recipe[] => {
  try {
    // Try to parse as JSON first
    try {
      const recipes = JSON.parse(content);
      if (Array.isArray(recipes)) {
        return recipes.map(recipe => ({
          ...recipe,
          id: generateId(),
        }));
      }
    } catch (e) {
      console.log("Failed to parse JSON, trying markdown parsing");
    }

    // If JSON parsing fails, try to parse markdown-style recipes
    const recipeBlocks = content.split(/(?=#{1,2}\s+Recipe \d+:)|(?=#{1,2}\s+Recipe:)/g);
    
    if (recipeBlocks.length <= 1) {
      // If no recipe blocks found, try another format
      const alternativeBlocks = content.split(/(?=#{1,2}\s+\d+\.)|(?=#{1,2}\s+[A-Za-z\s]+ Recipe)/g);
      if (alternativeBlocks.length > 1) {
        return alternativeBlocks
          .filter(block => block.trim())
          .map(parseRecipeBlock);
      }
    }
    
    return recipeBlocks
      .filter(block => block.trim())
      .map(parseRecipeBlock);
  } catch (error) {
    console.error("Error parsing recipes:", error);
    return [];
  }
};

const parseRecipeBlock = (block: string): Recipe => {
  // Extract title with more robust pattern matching
  const titleMatch = block.match(/#+\s*(.*?)(?:\r?\n|$)/);
  const title = titleMatch ? titleMatch[1].replace(/Recipe\s*\d*:?\s*/i, '').trim() : 'Untitled Recipe';
  
  // Extract ingredients with better formatting
  const ingredientsMatch = block.match(/(?:Ingredients?[:\s]*)([\s\S]*?)(?:##|Instructions?|Directions?|Method|Steps?|$)/i);
  const ingredientsText = ingredientsMatch ? ingredientsMatch[1] : '';
  const ingredients = ingredientsText
    .split('\n')
    .map(line => line.replace(/^-\s*|\*\s*|•\s*|\d+\.\s*/, '').trim())
    .filter(line => line && !line.match(/ingredients?/i));
  
  // Extract instructions with improved formatting
  const instructionsMatch = block.match(/(?:Instructions?|Directions?|Method|Steps?)[:\s]*([\s\S]*?)(?:##|Health Benefits?|Special Considerations?|$)/i);
  const instructionsText = instructionsMatch ? instructionsMatch[1] : '';
  const instructions = instructionsText
    .split('\n')
    .map(line => line.replace(/^-\s*|\*\s*|•\s*|\d+\.\s*/, '').trim())
    .filter(line => line && !line.match(/instructions?|directions?|method|steps?/i))
    .map(instruction => instruction.charAt(0).toUpperCase() + instruction.slice(1)); // Capitalize first letter
  
  // Extract health benefits with better formatting
  const healthBenefitsMatch = block.match(/(?:Health Benefits?)[:\s]*([\s\S]*?)(?:##|Special Considerations?|$)/i);
  const healthBenefits = healthBenefitsMatch 
    ? healthBenefitsMatch[1].trim() 
    : 'Rich in essential nutrients to support overall health.';
  
  // Extract special considerations with better formatting
  const considerationsMatch = block.match(/(?:Special Considerations?)[:\s]*([\s\S]*?)(?:##|$)/i);
  const specialConsiderations = considerationsMatch ? considerationsMatch[1].trim() : '';
  
  // Extract or generate more meaningful tags
  let tags: string[] = [];
  
  // Look for diet patterns
  const dietMatch = block.match(/(?:vegan|vegetarian|pescatarian|keto|paleo|low-carb|gluten-free|dairy-free)/gi);
  if (dietMatch) {
    tags = [...new Set(dietMatch.map(tag => tag.toLowerCase()))];
  }
  
  // Add meal type tag
  const mealTypes = ['breakfast', 'lunch', 'dinner', 'dessert', 'snack', 'appetizer'];
  for (const mealType of mealTypes) {
    if (title.toLowerCase().includes(mealType) || block.toLowerCase().includes(mealType)) {
      tags.push(mealType);
      break;
    }
  }

  // Add ingredient-based tags
  const commonIngredients = ['chicken', 'beef', 'fish', 'seafood', 'vegetable', 'fruit', 'pasta', 'rice', 'tofu'];
  for (const ingredient of commonIngredients) {
    if (block.toLowerCase().includes(ingredient)) {
      tags.push(ingredient);
    }
  }
  
  // Generate difficulty and cook time if not explicitly provided
  const difficultyMatch = block.match(/difficulty[:\s]*(easy|medium|hard|beginner|intermediate|advanced)/i);
  const difficulty = difficultyMatch ? capitalizeFirstLetter(difficultyMatch[1]) : 'Medium';
  
  const timeMatch = block.match(/(?:cook|prep|total)\s*time[:\s]*(\d+\s*(?:min|minutes?|hrs?|hours?))/i);
  const cookTime = timeMatch ? timeMatch[1] : '30 min';
  
  return {
    id: generateId(),
    title,
    tags: tags.length > 0 ? tags : ['Healthy', 'Homemade'],
    ingredients,
    instructions,
    healthBenefits,
    specialConsiderations,
    difficulty,
    cookTime,
  };
};

// Helper to generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

// Helper to capitalize the first letter
const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
