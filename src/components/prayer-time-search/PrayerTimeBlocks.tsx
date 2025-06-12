
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

  // Define prayer block base colors - updated with more muted colors
  const prayerColors = {
    fajr: 'bg-pink-100 hover:bg-pink-200',
    dhuhr: 'bg-amber-100 hover:bg-amber-200',
    asr: 'bg-emerald-100 hover:bg-emerald-200',
    isha: 'bg-indigo-100 hover:bg-indigo-200',
  };

  // Define prayer text colors
  const prayerTextColors = {
    fajr: 'text-pink-700',
    dhuhr: 'text-amber-700',
    asr: 'text-emerald-700',
    isha: 'text-indigo-700',
  };

  // Define active block colors - using the new muted colors
  const activeColors = {
    fajr: 'bg-pink-400 text-white',
    dhuhr: 'bg-amber-500 text-white',
    asr: 'bg-emerald-500 text-white',
    isha: 'bg-indigo-500 text-white',
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
