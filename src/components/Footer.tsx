
import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Github, Coffee, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border/40 backdrop-blur-md bg-space-dark/80 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <UtensilsCrossed className="h-5 w-5 text-neon-blue" />
              <h2 className="text-lg font-serif font-bold text-neon-blue">AstroChef</h2>
            </Link>
            <p className="text-sm text-space-light/70 max-w-xs">
              Discover health-focused recipes personalized to your needs and dietary requirements, powered by advanced AI.
            </p>
          </div>
          
          <div>
            <h3 className="text-space-light font-medium mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-space-light/70 hover:text-neon-blue transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/recipes" className="text-sm text-space-light/70 hover:text-neon-blue transition-colors">Recipes</Link>
              </li>
              <li>
                <Link to="/saved" className="text-sm text-space-light/70 hover:text-neon-blue transition-colors">Saved Recipes</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-space-light/70 hover:text-neon-blue transition-colors">About</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-space-light font-medium mb-4">Connect</h3>
            <div className="flex gap-4 mb-4">
              <a href="https://github.com/shreyas434" className="text-space-light/70 hover:text-neon-blue transition-colors" target='_blank'>
                <Github className="h-5 w-5" />
              </a>
              {/* <a href="#" className="text-space-light/70 hover:text-neon-blue transition-colors">
                <Coffee className="h-5 w-5" />
              </a> */}
            </div>
            <p className="text-sm text-space-light/70">
              Made with <Heart className="inline h-3 w-3 text-cyber-pink" /> and AI magic
            </p>
          </div>
        </div>
        
        <div className="border-t border-border/40 mt-8 pt-6 text-center">
          <p className="text-xs text-space-light/60">
            © {new Date().getFullYear()} AstroChef. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
