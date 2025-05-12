
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

  // Prayer-specific colors with adjusted shades
  const getPrayerColors = () => {
    switch (activePrayer) {
      case 'fajr':
        return {
          bgNormal: 'bg-pink-100',
          textNormal: 'text-pink-700',
          bgSelected: 'bg-yellow-500',
          textSelected: 'text-black',
          bgEarliest: 'bg-pink-50',
          textEarliest: 'text-pink-800',
          bgLatest: 'bg-pink-700',
          textLatest: 'text-white'
        };
      case 'dhuhr':
        return {
          bgNormal: 'bg-amber-100',
          textNormal: 'text-amber-700',
          bgSelected: 'bg-yellow-500',
          textSelected: 'text-black',
          bgEarliest: 'bg-amber-50',
          textEarliest: 'text-amber-800',
          bgLatest: 'bg-amber-700',
          textLatest: 'text-white'
        };
      case 'asr':
        return {
          bgNormal: 'bg-teal-100',
          textNormal: 'text-teal-700',
          bgSelected: 'bg-yellow-500',
          textSelected: 'text-black',
          bgEarliest: 'bg-teal-50',
          textEarliest: 'text-teal-800',
          bgLatest: 'bg-teal-700',
          textLatest: 'text-white'
        };
      case 'isha':
        return {
          bgNormal: 'bg-indigo-100',
          textNormal: 'text-indigo-700',
          bgSelected: 'bg-yellow-500',
          textSelected: 'text-black',
          bgEarliest: 'bg-indigo-50',
          textEarliest: 'text-indigo-800',
          bgLatest: 'bg-indigo-700',
          textLatest: 'text-white'
        };
      default:
        return {
          bgNormal: 'bg-gray-100',
          textNormal: 'text-gray-700',
          bgSelected: 'bg-yellow-500',
          textSelected: 'text-black',
          bgEarliest: 'bg-gray-50',
          textEarliest: 'text-gray-800',
          bgLatest: 'bg-gray-700',
          textLatest: 'text-white'
        };
    }
  };

  const colors = getPrayerColors();

  const getTimeClass = (time: string) => {
    let baseClass = 'p-2 rounded text-center cursor-pointer relative';
    
    // Selected time - yellow background with black text
    if (time === selectedTime) {
      return `${baseClass} bg-yellow-500 text-black`;
    }
    
    // Earliest time - lightest shade of prayer color with dark text
    if (earliestTime && time === earliestTime.time) {
      return `${baseClass} ${colors.bgEarliest} ${colors.textEarliest}`;
    }
    
    // Latest time - darkest shade of prayer color with white text
    if (latestTime && time === latestTime.time) {
      return `${baseClass} ${colors.bgLatest} ${colors.textLatest}`;
    }
    
    // Default time blocks - medium shade
    return `${baseClass} ${colors.bgNormal} hover:bg-gray-200 ${colors.textNormal}`;
  };

  // Use grid with more columns for desktop and 3 for mobile
  const gridCols = isMobile ? "grid-cols-3" : "grid-cols-6";

  return (
    <div className="mt-4">
      <div className={`grid ${gridCols} gap-2`}>
        {times.map((time) => {
          const isSelected = time === selectedTime;
          const isEarliest = earliestTime && time === earliestTime.time;
          const isLatest = latestTime && time === latestTime.time;
          
          return (
            <div
              key={time}
              className={getTimeClass(time)}
              onClick={() => onSelectTime(time)}
            >
              {time}
              
              {/* Add SELECTED badge for selected time */}
              {isSelected && (
                <div className="mt-1 text-xs font-semibold text-black">SELECTED</div>
              )}
              
              {/* Add EARLIEST badge for earliest time */}
              {isEarliest && !isSelected && (
                <div className={`mt-1 text-xs font-semibold ${colors.textEarliest}`}>EARLIEST</div>
              )}
              
              {/* Add LATEST badge for latest time */}
              {isLatest && !isSelected && (
                <div className={`mt-1 text-xs font-semibold ${colors.textLatest}`}>
                  LATEST
                </div>
              )}
              
              {/* Show LATEST in black text if it's also selected */}
              {isLatest && isSelected && (
                <div className="mt-1 text-xs font-semibold text-black">LATEST</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSelectionGrid;
