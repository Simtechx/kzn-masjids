
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
    <div className="flex gap-2 mb-4">
      {prayerTypes.map((prayer) => (
        <div 
          key={prayer}
          className={`p-2 rounded cursor-pointer text-center flex-1 ${
            activePrayer === prayer 
              ? 'bg-islamic-blue text-white' 
              : 'bg-white hover:bg-gray-50'
          }`}
          onClick={() => onSelectPrayer(prayer)}
        >
          <div className="font-medium text-sm">
            {prayer.charAt(0).toUpperCase() + prayer.slice(1)}
          </div>
          <div className="text-xs">{findExtremeTime(prayer, 'earliest', selectedRegion)?.time}</div>
        </div>
      ))}
    </div>
  );
};

export default PrayerTimeBlocks;
