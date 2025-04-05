
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookmarkIcon, UtensilsCrossed, ChefHat, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Recipe } from '@/types/Recipe';

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);

  // This would be replaced with actual saved recipes logic in a real app
  useEffect(() => {
    // Placeholder - in a real app, load from localStorage or API
    setSavedRecipes([]);
  }, []);

  return (
    <div className="min-h-[calc(100vh-70px)] py-12 container mx-auto px-4">
      <h1 className="text-4xl font-serif font-bold mb-4 text-center neon-text">
        <BookmarkIcon className="inline-block w-8 h-8 mr-2" />
        Your Saved Recipes
      </h1>
      <p className="text-xl text-space-light/80 text-center mb-10 max-w-2xl mx-auto">
        Keep track of your favorite recipes for quick and easy access
      </p>

      {savedRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Saved recipes would be displayed here */}
        </div>
      ) : (
        <div className="glass-card p-8 md:p-12 text-center max-w-2xl mx-auto">
          <ChefHat className="w-16 h-16 text-neon-blue mx-auto mb-6 opacity-50" />
          <h2 className="text-2xl font-serif font-bold mb-3 text-neon-blue">No Saved Recipes Yet</h2>
          <p className="text-space-light/70 mb-6">
            You haven't saved any recipes yet. Generate some amazing recipes and save your favorites!
          </p>
          <Button asChild className="bg-neon-gradient hover:opacity-90 transition-opacity">
            <Link to="/recipes">
              Generate Recipes <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default SavedRecipes;
