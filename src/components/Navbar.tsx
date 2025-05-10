
import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Navbar = () => {
  return (
    <nav className="bg-teal-700 text-white py-3 px-4 md:px-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <div className="text-teal-700 text-xl font-bold">KM</div>
          </div>
          <Link to="/" className="text-xl font-semibold">KZN Masjid Explorer</Link>
        </div>
        
        <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <div className="relative w-full md:w-64 xl:w-80">
            <Input 
              placeholder="Search for masjid or area..." 
              className="pl-10 bg-white/20 border-none focus:ring-white text-white placeholder:text-white/70"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={18} />
          </div>
          <div className="flex space-x-2 w-full md:w-auto justify-between">
            <Button variant="outline" className="border-white/30 bg-white/10 hover:bg-white/20 text-white">About</Button>
            <Button className="bg-amber-500 hover:bg-amber-600 text-black">Contact</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
