
import React from 'react';
import { PrayerType, findExtremeTime, getDistinctTimes } from '@/utils/prayerTimeUtils';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
  // Get distinct times for the selected prayer
  const times = getDistinctTimes(activePrayer, selectedRegion);

  // Find earliest and latest times
  const earliestTime = findExtremeTime(activePrayer, 'earliest', selectedRegion);
  const latestTime = findExtremeTime(activePrayer, 'latest', selectedRegion);

  const getTimeClass = (time: string) => {
    let baseClass = 'p-2 rounded text-center cursor-pointer';
    
    // Selected state
    if (time === selectedTime) {
      return `${baseClass} bg-teal-600 text-white`;
    }
    
    // Earliest time
    if (earliestTime && time === earliestTime.time) {
      return `${baseClass} bg-green-100 text-green-700 border border-green-300`;
    }
    
    // Latest time
    if (latestTime && time === latestTime.time) {
      return `${baseClass} bg-orange-100 text-orange-700 border border-orange-300`;
    }
    
    // Default
    return `${baseClass} bg-gray-100 hover:bg-gray-200 text-gray-700`;
  };

  // Mobile: 3 per row, Desktop: 5 per row
  const gridCols = isMobile ? "grid-cols-3" : "grid-cols-5";

  return (
    <div className="mt-4">
      <div className={`grid ${gridCols} gap-2`}>
        {times.map((time) => (
          <div
            key={time}
            className={getTimeClass(time)}
            onClick={() => onSelectTime(time)}
          >
            {time}
            {earliestTime && time === earliestTime.time && (
              <div className="text-xs mt-1 bg-green-600 text-white px-1 py-0.5 rounded-sm">Earliest</div>
            )}
            {latestTime && time === latestTime.time && (
              <div className="text-xs mt-1 bg-orange-600 text-white px-1 py-0.5 rounded-sm">Latest</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSelectionGrid;
