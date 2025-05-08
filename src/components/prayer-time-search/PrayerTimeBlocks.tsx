
import React from 'react';
import { PrayerType, findExtremeTime } from '@/utils/prayerTimeUtils';

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
  const prayerTypes: PrayerType[] = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 mb-4">
      {prayerTypes.map((prayer) => (
        <div 
          key={prayer}
          className={`p-3 rounded cursor-pointer text-center ${
            activePrayer === prayer 
              ? 'bg-islamic-blue text-white' 
              : 'bg-white hover:bg-gray-50'
          }`}
          onClick={() => onSelectPrayer(prayer)}
        >
          <div className="font-medium">
            {prayer === 'fajr' ? 'Subh Saadiq - Fajr' :
             prayer === 'dhuhr' ? 'Zawaal - Dhuhr' :
             prayer.charAt(0).toUpperCase() + prayer.slice(1)}
          </div>
          <div>{findExtremeTime(prayer, 'earliest', selectedRegion)?.time}</div>
        </div>
      ))}
    </div>
  );
};

export default PrayerTimeBlocks;
