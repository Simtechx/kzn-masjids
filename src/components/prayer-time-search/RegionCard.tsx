
import React from 'react';
import { MapPin } from 'lucide-react';

interface RegionCardProps {
  region: string;
  isSelected: boolean;
  backgroundImage: string;
  subRegionCount: number;
  masjidCount: number;
  musallaCount: number;
  onSelectRegion: (region: string) => void;
}

const RegionCard: React.FC<RegionCardProps> = ({
  region,
  isSelected,
  backgroundImage,
  subRegionCount,
  masjidCount,
  musallaCount,
  onSelectRegion
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 ${
        isSelected ? "ring-4 ring-yellow-600" : "hover:shadow-lg"
      }`}
      onClick={() => onSelectRegion(region)}
    >
      {/* Background Image - Make sure it loads correctly */}
      <div 
        className="aspect-[4/3] bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for text visibility */}
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4">
          <h3 className="text-white text-xl font-bold">{region}</h3>
          <div className="flex items-center text-white/90 mt-1">
            <MapPin size={16} className="mr-1" />
            <span>{subRegionCount} sub-regions</span>
          </div>
          <div className="text-white/80 text-sm mt-1">
            {masjidCount} Masjids • {musallaCount} Musallas
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionCard;
