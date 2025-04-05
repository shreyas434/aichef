
import React from 'react';
import { Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="py-4 mb-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-8 w-8 text-neon-blue animate-pulse-light" />
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-neon-gradient animate-pulse-light">
            AstroChef AI
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <a href="#about" className="text-space-light hover:text-neon-blue transition-colors">
            About
          </a>
          <a href="#how-it-works" className="text-space-light hover:text-neon-blue transition-colors">
            How It Works
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
