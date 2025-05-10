
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative bg-islamic-pattern py-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-600/95 to-teal-700/95"></div>
      <div className="container mx-auto relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-white mb-4 text-4xl md:text-5xl font-bold">Find Masjids & Musallahs in KwaZulu-Natal</h1>
          <p className="text-white/90 text-lg md:text-xl mb-8">
            Discover prayer spaces across KZN's 5 regions - Northern Natal, South Coast, Durban, Midlands, North Coast.
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-12 islamic-decorative"></div>
    </div>
  );
};

export default Hero;
