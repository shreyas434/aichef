
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Utensils, Heart, Clock, Sparkles, ChefHat, Timer } from 'lucide-react';
import { Recipe } from '@/types/Recipe';
import { Badge } from '@/components/ui/badge';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="glass-card overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] mb-8">
      <div className="p-6">
        <h3 className="text-2xl font-serif font-bold mb-3 text-neon-blue">{recipe.title}</h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {recipe.tags.map((tag, index) => (
            <Badge 
              key={index} 
              className="bg-neon-purple/20 text-neon-purple border border-neon-purple/30 hover:bg-neon-purple/30"
            >
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center flex-wrap gap-3 mb-5 text-sm">
          <div className="flex items-center bg-muted/30 px-3 py-1 rounded-full">
            <Clock className="w-4 h-4 mr-1 text-cyber-green" />
            <span>{recipe.cookTime}</span>
          </div>
          <div className="flex items-center bg-muted/30 px-3 py-1 rounded-full">
            <ChefHat className="w-4 h-4 mr-1 text-cyber-pink" />
            <span>{recipe.difficulty}</span>
          </div>
        </div>
        
        {recipe.healthBenefits && (
          <div className="mb-5 bg-muted/10 p-4 rounded-lg border border-cyber-green/20">
            <h4 className="text-sm font-bold flex items-center gap-1 text-cyber-green mb-2">
              <Heart className="w-4 h-4" /> Health Benefits
            </h4>
            <p className="text-sm leading-relaxed">{recipe.healthBenefits}</p>
          </div>
        )}
        
        <Button 
          onClick={() => setExpanded(!expanded)} 
          variant="ghost" 
          className="w-full flex items-center justify-center gap-1 hover:bg-muted/30 hover:text-neon-blue transition-colors mt-2"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4" /> Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" /> Show Full Recipe
            </>
          )}
        </Button>
        
        {expanded && (
          <div className="mt-6 space-y-6 animate-fade-in">
            <div className="bg-muted/10 p-4 rounded-lg border border-neon-blue/20">
              <h4 className="text-sm font-bold flex items-center gap-1 text-neon-blue mb-3">
                <Sparkles className="w-4 h-4" /> Ingredients
              </h4>
              <ul className="list-disc pl-5 text-sm space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="leading-relaxed">{ingredient}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-muted/10 p-4 rounded-lg border border-neon-blue/20">
              <h4 className="text-sm font-bold flex items-center gap-1 text-neon-blue mb-3">
                <Utensils className="w-4 h-4" /> Instructions
              </h4>
              <ol className="list-decimal pl-5 text-sm space-y-3">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="leading-relaxed">{step}</li>
                ))}
              </ol>
            </div>
            
            {recipe.specialConsiderations && (
              <div className="bg-muted/10 p-4 rounded-lg border border-cyber-pink/20">
                <h4 className="text-sm font-bold flex items-center gap-1 text-cyber-pink mb-2">
                  <Heart className="w-4 h-4" /> Special Considerations
                </h4>
                <p className="text-sm leading-relaxed">{recipe.specialConsiderations}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default RecipeCard;
