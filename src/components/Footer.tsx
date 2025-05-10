
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Plus, InfoIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-islamic-dark-green text-white">
      <div className="container mx-auto py-12 px-4">
        {/* Contribute Masjid Info Section */}
        <div className="mb-12 p-6 rounded-lg bg-teal-800/80 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4">Want to add a masjid or update information?</h3>
          <p className="text-white/90 mb-6">
            Help us make this directory more comprehensive by contributing information 
            about masjids or musallahs in your area.
          </p>
          <button className="bg-amber-500 hover:bg-amber-600 text-black font-medium py-3 px-8 rounded-md text-lg">
            Contribute Information
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">KwaZulu-Natal Masjids & Musallahs</h3>
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
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0 text-islamic-gold" />
                <span className="text-white/80">KwaZulu-Natal, South Africa</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0 text-islamic-gold" />
                <a href="mailto:contact@kznmasjids.co.za" className="text-white/80 hover:text-white transition-colors">
                  contact@kznmasjids.co.za
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0 text-islamic-gold" />
                <a href="tel:+27123456789" className="text-white/80 hover:text-white transition-colors">
                  +27 31 555 0123
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-4 border-t border-white/20 text-center text-white/60">
          <p>© 2025 kznmasjid.co.za by Simtech W. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
