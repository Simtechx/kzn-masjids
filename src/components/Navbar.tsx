
import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Navbar = () => {
  return (
    <nav className="bg-teal-800 text-white py-3 px-4 md:px-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <div className="text-teal-800 text-xl font-bold">KM</div>
          </div>
          <Link to="/" className="text-xl font-semibold">KZN Masjid Explorer</Link>
        </div>
        
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0 max-w-md">
            <Input 
              placeholder="Enter a region, area or city..." 
              className="pl-10 bg-white border-none h-12 text-gray-800 rounded-l-md focus:ring-amber-300"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          </div>
          <Button className="bg-amber-500 hover:bg-amber-600 text-black h-12 px-8 rounded-r-md">
            Search
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
