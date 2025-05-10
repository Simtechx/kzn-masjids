
import React from 'react';
import { PrayerType, getUniquePrayerTimes } from '@/utils/prayerTimeUtils';

interface TimeSelectionGridProps {
  activePrayer: PrayerType;
  selectedRegion: string;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}

const TimeSelectionGrid: React.FC<TimeSelectionGridProps> = ({
  activePrayer,
  selectedRegion,
  selectedTime,
  onSelectTime
}) => {
  // Get unique times and sort them
  const uniquePrayerTimes = getUniquePrayerTimes(activePrayer);

  return (
    <div className="mb-6">
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
        {uniquePrayerTimes.map((time, index) => {
          return (
            <div 
              key={index}
              className={`p-2 rounded text-center cursor-pointer 
                ${selectedTime === time 
                  ? 'bg-[#14615f] text-white' 
                  : 'bg-white hover:bg-gray-50'}`}
              onClick={() => onSelectTime(time)}
            >
              <div>{time}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSelectionGrid;
