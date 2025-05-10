
import React from 'react';
import { PrayerType } from '@/utils/prayerTimeUtils';

interface PrayerTimeBlocksProps {
  selectedRegion: string | null;
  activePrayer: PrayerType | null;
  onSelectPrayer: (prayer: PrayerType) => void;
}

const PrayerTimeBlocks: React.FC<PrayerTimeBlocksProps> = ({ 
  selectedRegion, 
  activePrayer, 
  onSelectPrayer 
}) => {
  // Exclude maghrib as per requirements
  const prayerTypes: PrayerType[] = ['fajr', 'dhuhr', 'asr', 'isha'];

  // Define prayer block colors with updated theme using #14615f as a base
  const prayerColors = {
    fajr: 'bg-pink-50 hover:bg-pink-100',     // Light pink
    dhuhr: 'bg-amber-50 hover:bg-amber-100',   // Light amber
    asr: 'bg-emerald-50 hover:bg-emerald-100', // Light green
    isha: 'bg-indigo-50 hover:bg-indigo-100',  // Light purple
  };

  // Define prayer text colors
  const prayerTextColors = {
    fajr: 'text-pink-600',
    dhuhr: 'text-amber-600',
    asr: 'text-emerald-600',
    isha: 'text-indigo-600',
  };

  // Define active block colors using the requested color theme
  const activeColors = {
    fajr: 'bg-[#14615f] text-white',
    dhuhr: 'bg-[#14615f] text-white',
    asr: 'bg-[#14615f] text-white',
    isha: 'bg-[#14615f] text-white',
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {prayerTypes.map((prayer) => {
        const isActive = activePrayer === prayer;
        
        return (
          <div 
            key={prayer}
            className={`p-3 rounded cursor-pointer text-center flex-1 shadow-sm ${
              isActive 
                ? activeColors[prayer] 
                : `${prayerColors[prayer]}`
            }`}
            onClick={() => onSelectPrayer(prayer)}
          >
            <div className={`font-medium ${!isActive ? prayerTextColors[prayer] : ''}`}>
              {prayer.charAt(0).toUpperCase() + prayer.slice(1)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PrayerTimeBlocks;
