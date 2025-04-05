
import React from 'react';
import { Link } from 'react-router-dom';
import { InfoIcon, Brain, UtensilsCrossed, Coffee, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <div className="min-h-[calc(100vh-70px)] py-12">
      <div className="container mx-auto px-4">
        <section className="max-w-3xl mx-auto mb-16 text-center">
          <h1 className="text-4xl font-serif font-bold mb-4 neon-text animate-pulse-light">
            <InfoIcon className="inline-block w-8 h-8 mr-2" />
            About AstroChef
          </h1>
          <p className="text-xl text-space-light/80 mb-10">
            Revolutionizing how you cook with AI-powered recipe generation
          </p>
          
          <div className="glass-card p-8 rounded-lg text-left">
            <h2 className="text-2xl font-serif font-bold mb-4 text-cyber-green">Our Mission</h2>
            <p className="text-space-light/80 mb-6 leading-relaxed">
              AstroChef was created with a simple mission: to make healthy, personalized cooking accessible to everyone. 
              We believe that food should not only be delicious but also nourishing and tailored to your specific health needs.
            </p>
            <p className="text-space-light/80 mb-6 leading-relaxed">
              By combining cutting-edge AI technology with nutritional science, we've built a platform that creates 
              unique recipes designed specifically for your dietary requirements, health conditions, and taste preferences.
            </p>
          </div>
        </section>
        
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-serif font-bold mb-8 text-center neon-text">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-lg text-center">
              <div className="bg-neon-blue/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-neon-blue">1</span>
              </div>
              <h3 className="text-xl font-medium mb-3 text-neon-blue">Enter Your Preferences</h3>
              <p className="text-space-light/70">
                Tell us what ingredients you'd like to use, any dietary restrictions, and health conditions.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-lg text-center">
              <div className="bg-neon-purple/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-neon-purple">2</span>
              </div>
              <h3 className="text-xl font-medium mb-3 text-neon-purple">AI Magic Happens</h3>
              <p className="text-space-light/70">
                Our advanced AI generates personalized recipes based on your inputs and nutritional science.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-lg text-center">
              <div className="bg-cyber-pink/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-cyber-pink">3</span>
              </div>
              <h3 className="text-xl font-medium mb-3 text-cyber-pink">Cook & Enjoy</h3>
              <p className="text-space-light/70">
                Follow the detailed instructions to create delicious, health-optimized meals.
              </p>
            </div>
          </div>
        </section>
        
        <section className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-serif font-bold mb-8 text-center neon-text">Our Technology</h2>
          
          <div className="glass-card p-8 rounded-lg mb-8">
            <div className="flex items-start gap-6 mb-6">
              <div className="bg-cyber-green/20 rounded-full p-3 mt-1">
                <Brain className="w-6 h-6 text-cyber-green" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2 text-cyber-green">Advanced AI</h3>
                <p className="text-space-light/80 leading-relaxed">
                  AstroChef uses state-of-the-art AI models to understand your needs and generate recipes that are both 
                  delicious and tailored to your specific requirements. Our technology can adapt recipes for various 
                  health conditions, dietary restrictions, and taste preferences.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="bg-neon-blue/20 rounded-full p-3 mt-1">
                <UtensilsCrossed className="w-6 h-6 text-neon-blue" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2 text-neon-blue">Nutritional Science</h3>
                <p className="text-space-light/80 leading-relaxed">
                  Every recipe is backed by nutritional science to ensure that you're not just eating tasty food, 
                  but also getting the nutrients your body needs. We consider health benefits, ingredient interactions, 
                  and specific dietary requirements in every recipe we generate.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="max-w-3xl mx-auto text-center">
          <div className="glass-card p-8 md:p-12 rounded-lg border border-neon-purple/30">
            <Coffee className="w-12 h-12 text-neon-purple mx-auto mb-6" />
            <h2 className="text-3xl font-serif font-bold mb-6 text-neon-blue">
              Ready to Transform Your Cooking?
            </h2>
            <p className="text-xl text-space-light/80 mb-8 max-w-lg mx-auto">
              Get started with AstroChef today and discover delicious, health-conscious recipes personalized just for you.
            </p>
            <Button asChild className="bg-neon-gradient hover:opacity-90 transition-opacity">
              <Link to="/recipes">
                Generate Your First Recipe <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
