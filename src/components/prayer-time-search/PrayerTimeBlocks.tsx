
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

  // Define prayer block base colors - using custom hex colors
  const prayerColors = {
    fajr: 'bg-pink-50 hover:bg-pink-100',
    dhuhr: 'bg-amber-50 hover:bg-amber-100',
    asr: 'bg-emerald-50 hover:bg-emerald-100',
    isha: 'bg-indigo-50 hover:bg-indigo-100',
  };

  // Define prayer text colors using custom hex colors
  const prayerTextColors = {
    fajr: 'text-[#991F4B]',
    dhuhr: 'text-[#B36100]',
    asr: 'text-[#046645]',
    isha: 'text-[#003049]',
  };

  // Define active block colors using custom hex colors
  const activeColors = {
    fajr: 'bg-[#991F4B] text-white',
    dhuhr: 'bg-[#B36100] text-white',
    asr: 'bg-[#046645] text-white',
    isha: 'bg-[#003049] text-white',
  };

  // For mobile, use a 2x2 grid layout
  const gridCols = isMobile ? "grid-cols-2" : "grid-cols-4";

  return (
    <div className="w-full">
      <div className={`grid ${gridCols} gap-3 mb-6`}>
        {prayerTypes.map((prayer) => {
          const isActive = activePrayer === prayer;
          
          return (
            <div 
              key={prayer}
              className={`p-3 rounded cursor-pointer text-center flex items-center justify-center shadow-sm ${
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
