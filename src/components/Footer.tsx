import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from './ui/use-toast';

const Footer = () => {
  const [isContributeDialogOpen, setIsContributeDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    masjidName: '',
    address: '',
    whatsapp: ''
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Information Received",
      description: "Thank you for contributing to our database.",
    });
    setFormData({
      masjidName: '',
      address: '',
      whatsapp: ''
    });
    setIsContributeDialogOpen(false);
  };

  return (
    <footer className="bg-[#072c23] text-white py-6 px-4">
      <div className="container mx-auto">        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-3">KwaZulu-Natal Masjids & Musallahs</h3>
              <p className="text-white/80 mb-3 text-sm">
                Your comprehensive guide to masjids and musallahs across all regions of KwaZulu-Natal, South Africa.
              </p>
            </div>
            <div className="mt-4">
              <Button 
                className="bg-amber-500 hover:bg-amber-600 text-black py-1 px-3 rounded-md text-sm"
                onClick={() => setIsContributeDialogOpen(true)}
              >
                Contribute Information
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Regions</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/region/north-coast" className="text-white/80 hover:text-white transition-colors">North Coast</Link></li>
              <li><Link to="/region/northern-natal" className="text-white/80 hover:text-white transition-colors">Northern Natal</Link></li>
              <li><Link to="/region/midlands" className="text-white/80 hover:text-white transition-colors">Midlands</Link></li>
              <li><Link to="/region/durban" className="text-white/80 hover:text-white transition-colors">Durban</Link></li>
              <li><Link to="/region/south-coast" className="text-white/80 hover:text-white transition-colors">South Coast</Link></li>
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
                <a href="tel:+27786700234" className="text-white/80 hover:text-white transition-colors">
                  +27 786 700 234
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-white/20 text-center text-white/60 text-sm">
          <p className="md:block hidden">© 2025 kznmasjid.co.za by Simtech W. All Rights Reserved</p>
          {/* Split into two lines for mobile */}
          <div className="md:hidden flex flex-col">
            <span>© 2025 kznmasjid.co.za by Simtech W</span>
            <span>All Rights Reserved</span>
          </div>
        </div>
      </div>

      {/* Contribution Form Dialog */}
      <Dialog open={isContributeDialogOpen} onOpenChange={setIsContributeDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="bg-[#072c23] text-white p-4 -mt-4 -mx-4 rounded-t-lg">
            <DialogTitle>Contribute Masjid Information</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitForm}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="masjidName" className="text-sm font-medium">Masjid or Musalla Name</label>
                <Input
                  id="masjidName"
                  name="masjidName"
                  value={formData.masjidName}
                  onChange={handleFormChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="address" className="text-sm font-medium">Address or Location</label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="whatsapp" className="text-sm font-medium">WhatsApp Number</label>
                <Input
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleFormChange}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-amber-500 text-black hover:bg-amber-600">
                Submit Information
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;
