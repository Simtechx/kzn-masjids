
import React from 'react';
import { PrayerType } from '@/utils/prayerTimeUtils';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
  // Exclude maghrib as per requirements
  const prayerTypes: PrayerType[] = ['fajr', 'dhuhr', 'asr', 'isha'];

  // Define prayer block base colors
  const prayerColors = {
    fajr: 'bg-pink-50 hover:bg-pink-100',
    dhuhr: 'bg-amber-50 hover:bg-amber-100',
    asr: 'bg-teal-50 hover:bg-teal-100',
    isha: 'bg-indigo-50 hover:bg-indigo-100',
  };

  // Define prayer text colors
  const prayerTextColors = {
    fajr: 'text-pink-600',
    dhuhr: 'text-amber-600',
    asr: 'text-teal-600',
    isha: 'text-indigo-600',
  };

  // Define active block colors
  const activeColors = {
    fajr: 'bg-pink-600 text-white',
    dhuhr: 'bg-amber-600 text-white',
    asr: 'bg-teal-600 text-white',
    isha: 'bg-indigo-600 text-white',
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        {prayerTypes.map((prayer) => {
          const isActive = activePrayer === prayer;
          
          return (
            <div 
              key={prayer}
              className={`p-3 rounded cursor-pointer text-center shadow-sm ${
                isActive 
                  ? activeColors[prayer] 
                  : prayerColors[prayer]
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
    </div>
  );
};

export default PrayerTimeBlocks;
