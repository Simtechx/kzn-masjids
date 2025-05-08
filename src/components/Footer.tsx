
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-islamic-dark-green text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">KZN Masjid Explorer</h3>
            <p className="text-white/80 mb-4">
              Your comprehensive guide to masjids and musallahs across all regions of KwaZulu-Natal, South Africa.
            </p>
            <div className="flex space-x-4">
              {/* Social media icons would go here */}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Regions</h3>
            <ul className="space-y-2">
              <li><Link to="/region/northern-natal" className="text-white/80 hover:text-white transition-colors">Northern Natal</Link></li>
              <li><Link to="/region/south-coast" className="text-white/80 hover:text-white transition-colors">South Coast</Link></li>
              <li><Link to="/region/durban" className="text-white/80 hover:text-white transition-colors">Durban</Link></li>
              <li><Link to="/region/midlands" className="text-white/80 hover:text-white transition-colors">Midlands</Link></li>
              <li><Link to="/region/north-coast" className="text-white/80 hover:text-white transition-colors">North Coast</Link></li>
              <li><Link to="/region/transkei" className="text-white/80 hover:text-white transition-colors">Transkei</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0" />
                <span className="text-white/80">KwaZulu-Natal, South Africa</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0" />
                <a href="mailto:contact@kznmasjids.co.za" className="text-white/80 hover:text-white transition-colors">
                  contact@kznmasjids.co.za
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0" />
                <a href="tel:+27123456789" className="text-white/80 hover:text-white transition-colors">
                  +27 12 345 6789
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-4 border-t border-white/20 text-center text-white/60">
          <p>© {new Date().getFullYear()} KZN Masjid Explorer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
