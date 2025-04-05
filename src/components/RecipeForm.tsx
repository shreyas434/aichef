
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UtensilsCrossed, Brain, Utensils } from 'lucide-react';
import { toast } from 'sonner';
import { AIModelProvider } from '@/types/AIProvider';
import { aiProviders } from '@/services/aiProviderService';

interface RecipeFormProps {
  onGenerate: (prompt: string, requirements: string, dietaryRestrictions: string) => void;
  isGenerating: boolean;
  hasApiKey: boolean;
  provider: AIModelProvider;
}

const healthConditions = [
  "None",
  "Diabetes",
  "Hypertension",
  "Heart Disease",
  "Celiac Disease",
  "IBS",
  "Arthritis",
  "Kidney Disease",
  "Gout",
  "Other"
];

const RecipeForm: React.FC<RecipeFormProps> = ({ onGenerate, isGenerating, hasApiKey, provider }) => {
  const [foodPrompt, setFoodPrompt] = useState('');
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('None');
  const providerName = aiProviders[provider]?.name || 'AI';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!foodPrompt.trim()) {
      toast.error("Please enter what food you'd like to cook!");
      return;
    }
    
    if (!hasApiKey) {
      toast.error("Please add your API key first!");
      return;
    }
    
    onGenerate(
      foodPrompt, 
      additionalRequirements, 
      selectedCondition !== 'None' ? selectedCondition : ''
    );
  };

  return (
    <div className="glass-card rounded-lg p-6 mb-8 animate-float">
      <h2 className="text-xl font-semibold mb-4 flex items-center justify-center">
        <UtensilsCrossed className="w-6 h-6 mr-2 text-neon-blue" />
        <span className="neon-text">Generate Recipes</span>
        {hasApiKey && <span className="text-xs ml-2 text-cyber-pink">(via {providerName})</span>}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="foodPrompt" className="block text-sm font-medium">
            What would you like to cook?
          </label>
          <Input
            id="foodPrompt"
            placeholder="e.g., pasta dish, breakfast smoothie, vegetarian dinner..."
            value={foodPrompt}
            onChange={(e) => setFoodPrompt(e.target.value)}
            className="bg-muted/50 border-neon-purple focus:border-neon-blue transition-all"
            disabled={isGenerating}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="healthCondition" className="block text-sm font-medium">
            Special Health Condition
          </label>
          <Select 
            value={selectedCondition} 
            onValueChange={setSelectedCondition}
            disabled={isGenerating}
          >
            <SelectTrigger className="bg-muted/50 border-neon-purple focus:border-neon-blue transition-all">
              <SelectValue placeholder="Select health condition" />
            </SelectTrigger>
            <SelectContent>
              {healthConditions.map((condition) => (
                <SelectItem key={condition} value={condition}>
                  {condition}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="additionalRequirements" className="block text-sm font-medium">
            Additional Requirements (Optional)
          </label>
          <Textarea
            id="additionalRequirements"
            placeholder="e.g., high protein, low carb, quick to prepare, kid-friendly..."
            value={additionalRequirements}
            onChange={(e) => setAdditionalRequirements(e.target.value)}
            className="bg-muted/50 border-neon-purple focus:border-neon-blue transition-all min-h-[80px]"
            disabled={isGenerating}
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-neon-gradient hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          disabled={isGenerating || !hasApiKey}
        >
          {isGenerating ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
              Generating Recipes...
            </>
          ) : (
            <>
              <Utensils className="h-4 w-4" />
              Generate Recipes
            </>
          )}
        </Button>
        
        {!hasApiKey && (
          <p className="text-xs text-cyber-pink text-center">
            Please add your API key first to enable recipe generation.
          </p>
        )}
      </form>
    </div>
  );
};

export default RecipeForm;
