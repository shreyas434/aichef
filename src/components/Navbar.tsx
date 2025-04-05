
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UtensilsCrossed, Sparkles, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Recipes', path: '/recipes' },
    { name: 'Saved Recipes', path: '/saved' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="border-b border-border/40 backdrop-blur-md bg-space-dark/80 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-neon-gradient p-2 rounded-full animate-pulse-light">
              <UtensilsCrossed className="h-5 w-5 text-space-dark group-hover:rotate-12 transition-transform" />
            </div>
            <h1 className="text-xl font-serif font-bold bg-clip-text text-transparent bg-neon-gradient">
              AstroChef
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm transition-colors hover:text-neon-blue relative ${
                  isActive(link.path) 
                    ? 'text-neon-blue after:content-[""] after:absolute after:bottom-[-3px] after:left-0 after:w-full after:h-0.5 after:bg-neon-blue' 
                    : 'text-space-light/80 hover:text-neon-blue'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-space-light/80"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border/40 mt-3 animate-fade-in">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`block py-2 px-3 rounded-md transition-colors ${
                      isActive(link.path)
                        ? 'bg-muted/20 text-neon-blue'
                        : 'text-space-light/80 hover:bg-muted/10 hover:text-neon-blue'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
