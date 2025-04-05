import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UtensilsCrossed, Brain, Sparkles, ChefHat, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeroImage from '@/components/HeroImage';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-70px)] bg-space-dark/95 relative overflow-hidden">
      {/* Background decorative elements - reduced animation intensity */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-neon-purple/10 rounded-full blur-3xl opacity-70"></div>
      <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl opacity-70"></div>
      
      {/* Hero Section */}
      <section className="py-20 md:py-28 container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">
          <div className="md:w-1/2 text-center md:text-left relative z-10">
            <div className="inline-block mb-4 bg-neon-purple/20 p-2 rounded-full">
              <Sparkles className="w-6 h-6 text-neon-purple" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-8 leading-tight text-white">
              Delicious Recipes, Tailored to Your Health
            </h1>
            <p className="text-xl text-white mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed">
              Discover health-focused recipes personalized to your dietary needs and preferences, powered by advanced AI technology.
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-5">
              <Button 
                onClick={() => navigate('/recipes')} 
                className="bg-neon-gradient hover:opacity-90 transition-opacity px-8 py-6 text-lg"
                size="lg"
              >
                Create Recipes <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/about')}
                className="border-neon-purple text-neon-purple hover:bg-neon-purple/20 px-8 py-6 text-lg"
                size="lg"
              >
                Learn More
              </Button>
            </div>

            {/* Quick stats */}
            {/* <div className="flex flex-wrap justify-center md:justify-start gap-8 mt-12">
              {[
                { number: "500+", text: "Recipes" },
                { number: "20k+", text: "Users" },
                { number: "4.9", text: "Rating", icon: <Star className="w-4 h-4 text-cyber-pink inline" /> }
              ].map((stat, index) => (
                <div key={index} className="flex flex-col items-center md:items-start">
                  <p className="text-2xl font-bold text-neon-green flex items-center gap-1">
                    {stat.number} {stat.icon}
                  </p>
                  <p className="text-white text-sm">{stat.text}</p>
                </div>
              ))}
            </div> */}
          </div>
          
          <div className="md:w-1/2 mb-6 md:mb-0 relative z-0 flex justify-center md:justify-end">
            {/* Empty div as placeholder, keeping structure intact */}
            <div className="w-3/4 aspect-square"></div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-space-dark to-space-dark/95 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-neon-blue uppercase tracking-wider text-sm font-medium mb-3 inline-block">Features</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-white inline-block relative">
              How AstroChef Helps You
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-neon-gradient rounded-full"></div>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {/* Feature cards - reduced animation */}
            <div className="glass-card p-8 rounded-xl hover:border-cyber-green/30 hover:shadow-lg hover:shadow-cyber-green/5 transition-all duration-300 border border-transparent">
              <div className="bg-cyber-green/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Brain className="w-10 h-10 text-cyber-green" />
              </div>
              <h3 className="text-2xl font-medium mb-4 text-cyber-green">AI-Powered Recipes</h3>
              <p className="text-white leading-relaxed">
                Our advanced AI understands your needs and creates delicious recipes customized just for you.
              </p>
            </div>
            
            <div className="glass-card p-8 rounded-xl hover:border-neon-blue/30 hover:shadow-lg hover:shadow-neon-blue/5 transition-all duration-300 border border-transparent">
              <div className="bg-neon-blue/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <UtensilsCrossed className="w-10 h-10 text-neon-blue" />
              </div>
              <h3 className="text-2xl font-medium mb-4 text-neon-blue">Health-Optimized</h3>
              <p className="text-white leading-relaxed">
                Every recipe comes with health benefits and is tailored to support your specific dietary needs.
              </p>
            </div>
            
            <div className="glass-card p-8 rounded-xl hover:border-cyber-pink/30 hover:shadow-lg hover:shadow-cyber-pink/5 transition-all duration-300 border border-transparent">
              <div className="bg-cyber-pink/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <ChefHat className="w-10 h-10 text-cyber-pink" />
              </div>
              <h3 className="text-2xl font-medium mb-4 text-cyber-pink">Disease-Conscious</h3>
              <p className="text-white leading-relaxed">
                Special dietary restrictions? AstroChef creates recipes tailored to specific health conditions.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 md:py-28 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto glass-card p-10 md:p-16 rounded-2xl border border-neon-purple/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-70"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyber-pink/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-70"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-neon-blue">
              Ready to Cook Something Amazing?
            </h2>
            <p className="text-xl text-white mb-10 max-w-2xl mx-auto leading-relaxed">
              Get started with AstroChef today and discover delicious, health-conscious recipes personalized just for you.
            </p>
            <Button 
              onClick={() => navigate('/recipes')} 
              className="bg-neon-gradient hover:opacity-90 transition-opacity text-lg px-10 py-6"
              size="lg"
            >
              Generate Your First Recipe <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            {/* Testimonial */}
            <div className="mt-10 pt-8 border-t border-space-light/10">
              <p className="italic text-white mb-4">"AstroChef completely changed how I cook. The personalized recipes are perfect for my diet needs!"</p>
              <p className="text-neon-purple font-medium">- Shreyas</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;