
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

interface RegionCardProps {
  region: {
    id: string;
    name: string;
    count: number;
    image: string;
  };
}

const RegionCard = ({ region }: RegionCardProps) => {
  return (
    <Link 
      to={`/region/${region.id}`} 
      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div 
        className="h-40 bg-cover bg-center" 
        style={{ 
          backgroundImage: `url(${region.image})` 
        }}
      >
        <div className="h-full w-full bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
          <h3 className="text-2xl font-bold text-white">{region.name}</h3>
        </div>
      </div>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center text-gray-700">
          <MapPin size={18} className="text-islamic-green mr-2" />
          <span>{region.count} Masjids & Musallahs</span>
        </div>
        <div className="mt-2 text-islamic-blue font-medium group-hover:text-islamic-green transition-colors flex justify-between items-center">
          <span>Explore Region</span>
          <span className="transform group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </Link>
  );
};

export default RegionCard;
