
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <nav className="bg-[#072c23] text-white py-2 px-4 md:px-6 shadow-md">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <div className="text-[#072c23] text-xl font-bold">KM</div>
            </div>
            <Link to="/" className="text-xl font-semibold">KZN Masjid Explorer</Link>
          </div>
          
          {/* Mobile menu button */}
          {isMobile && (
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
          
          {/* Desktop search */}
          {!isMobile && (
            <div className="hidden md:flex items-center space-x-4 w-auto">
              <div className="relative">
                <Input 
                  placeholder="Enter a region, area or city..." 
                  className="pl-10 bg-white border-none h-10 text-gray-800 rounded-l-md focus:ring-amber-300 w-64"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              </div>
              <Button className="bg-amber-500 hover:bg-amber-600 text-black h-10 px-5 rounded-r-md">
                Search
              </Button>
            </div>
          )}
        </div>
        
        {/* Mobile menu expanded */}
        {isMobile && mobileMenuOpen && (
          <div className="mt-4 pb-3 space-y-3">
            <div className="flex items-center">
              <div className="relative flex-grow">
                <Input 
                  placeholder="Enter a region, area or city..." 
                  className="pl-10 bg-white border-none h-10 text-gray-800 rounded-l-md focus:ring-amber-300 w-full"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              </div>
              <Button className="bg-amber-500 hover:bg-amber-600 text-black h-10 px-3 rounded-r-md">
                Search
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
