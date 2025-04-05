
export interface Recipe {
  id: string;
  title: string;
  tags: string[];
  cookTime: string;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
  healthBenefits: string;
  specialConsiderations?: string;
}
