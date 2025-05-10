
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-islamic-dark-green text-white py-6 px-4">
      <div className="container mx-auto">        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">KwaZulu-Natal Masjids & Musallahs</h3>
            <p className="text-white/80 mb-3 text-sm">
              Your comprehensive guide to masjids and musallahs across all regions of KwaZulu-Natal, South Africa.
            </p>
            <div className="flex space-x-4">
              {/* Social media icons would go here */}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Regions</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/region/northern-natal" className="text-white/80 hover:text-white transition-colors">Northern Natal</Link></li>
              <li><Link to="/region/south-coast" className="text-white/80 hover:text-white transition-colors">South Coast</Link></li>
              <li><Link to="/region/durban" className="text-white/80 hover:text-white transition-colors">Durban</Link></li>
              <li><Link to="/region/midlands" className="text-white/80 hover:text-white transition-colors">Midlands</Link></li>
              <li><Link to="/region/north-coast" className="text-white/80 hover:text-white transition-colors">North Coast</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1 flex-shrink-0 text-islamic-gold" />
                <span className="text-white/80">KwaZulu-Natal, South Africa</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 flex-shrink-0 text-islamic-gold" />
                <a href="mailto:contact@kznmasjids.co.za" className="text-white/80 hover:text-white transition-colors">
                  contact@kznmasjids.co.za
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 flex-shrink-0 text-islamic-gold" />
                <a href="tel:+27123456789" className="text-white/80 hover:text-white transition-colors">
                  +27 31 555 0123
                </a>
              </li>
              <li className="mt-3">
                <Button className="bg-amber-500 hover:bg-amber-600 text-black py-1 px-3 rounded-md text-sm">
                  Contribute Information
                </Button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-white/20 text-center text-white/60 text-sm">
          <p>© 2025 kznmasjid.co.za by Simtech W. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
