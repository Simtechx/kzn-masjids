
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative bg-islamic-pattern py-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-islamic-green/90 to-islamic-blue/90"></div>
      <div className="container mx-auto relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-white mb-4 text-4xl md:text-5xl font-bold">Find Masjids & Musallahs in KwaZulu-Natal</h1>
          <p className="text-white/90 text-lg md:text-xl mb-8">
            Discover prayer spaces across KZN's 5 regions - Northern Natal, South Coast, Durban, Midlands, North Coast and Transkei.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <div className="relative flex-grow">
              <Input 
                className="pl-10 h-12 bg-white border-none shadow-lg text-gray-800 placeholder:text-gray-500"
                placeholder="Search by name, area or city..."
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            </div>
            <Button className="h-12 px-6 bg-islamic-gold hover:bg-islamic-gold/90 text-black">Search</Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-12 islamic-decorative"></div>
    </div>
  );
};

export default Hero;
