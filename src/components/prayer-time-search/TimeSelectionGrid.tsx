
import React from 'react';
import { PrayerType, findExtremeTime, getUniquePrayerTimes } from '@/utils/prayerTimeUtils';

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
  const earliestTime = findExtremeTime(activePrayer, 'earliest', selectedRegion)?.time;
  const latestTime = findExtremeTime(activePrayer, 'latest', selectedRegion)?.time;
  
  // Get unique times and sort them
  const uniquePrayerTimes = getUniquePrayerTimes(activePrayer);

  return (
    <div className="mb-6">
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
        {uniquePrayerTimes.map((time, index) => {
          const isEarliest = time === earliestTime;
          const isLatest = time === latestTime;
          
          return (
            <div 
              key={index}
              className={`p-2 rounded text-center cursor-pointer 
                ${selectedTime === time ? 'bg-islamic-green text-white' : 
                  isEarliest ? 'bg-blue-100' : 
                  isLatest ? 'bg-amber-100' : 'bg-white hover:bg-gray-50'}`}
              onClick={() => onSelectTime(time)}
            >
              <div>{time}</div>
              {isEarliest && <div className="text-xs mt-1">EARLIEST</div>}
              {isLatest && <div className="text-xs mt-1">LATEST</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSelectionGrid;
