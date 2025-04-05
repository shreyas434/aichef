import React from 'react';

const HeroImage = () => {
  return (
    <div className="relative">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-neon-gradient opacity-20 blur-2xl rounded-full transform -translate-x-[10%] -translate-y-[10%]"></div>
      
      {/* Main image container */}
      <div className="relative glass-card p-4 rounded-2xl animate-float">
        <div className="aspect-square rounded-xl overflow-hidden">
          <img 
            src="/api/placeholder/600/600" 
            alt="Delicious and healthy food" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Star icon */}
        <div className="absolute -bottom-4 -right-4 bg-space-dark rounded-full p-3 border border-neon-blue/30 animate-pulse-light">
          <svg className="w-8 h-8 text-neon-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        {/* Arrow icon */}
        <div className="absolute top-4 left-4 bg-space-dark rounded-full p-2 border border-cyber-pink/30 animate-pulse-light delay-200">
          <svg className="w-6 h-6 text-cyber-pink" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5 6L12 2L7.5 6M12 2V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;