
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
  return (
    <div className="mb-6">
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 gap-2">
        <div className={`p-2 bg-blue-100 rounded text-center`}>
          <div className="text-xs font-medium">EARLIEST {activePrayer.toUpperCase()}</div>
          <div>{findExtremeTime(activePrayer, 'earliest', selectedRegion)?.time}</div>
        </div>
        
        {getUniquePrayerTimes(activePrayer).map((time, index) => {
          const isEarliest = time === findExtremeTime(activePrayer, 'earliest', selectedRegion)?.time;
          const isLatest = time === findExtremeTime(activePrayer, 'latest', selectedRegion)?.time;
          
          return (
            <div 
              key={index}
              className={`p-2 rounded text-center cursor-pointer 
                ${selectedTime === time ? 'bg-islamic-green text-white' : 
                  (isEarliest || isLatest) ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'}`}
              onClick={() => onSelectTime(time)}
            >
              <div>{time}</div>
              {isLatest && <div className="text-xs mt-1">LATEST {activePrayer.toUpperCase()}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSelectionGrid;
