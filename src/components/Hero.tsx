
import React from 'react';

const Hero = () => {
  return (
    <div className="relative bg-islamic-pattern py-12 md:py-16">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-700/95 to-teal-800/95"></div>
      <div className="container mx-auto relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-white mb-3 text-3xl md:text-4xl font-bold">Find Masjids & Musallahs in KwaZulu-Natal</h1>
          <p className="text-white/90 text-base md:text-lg mb-6">
            Discover prayer spaces across KZN's 5 regions - Northern Natal, South Coast, Durban, Midlands, North Coast.
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-12 islamic-decorative"></div>
    </div>
  );
};

export default Hero;
