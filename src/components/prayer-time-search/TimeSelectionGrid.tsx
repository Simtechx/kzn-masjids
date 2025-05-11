
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

  // Prayer-specific colors
  const getPrayerColors = () => {
    switch (activePrayer) {
      case 'fajr':
        return {
          bgNormal: 'bg-pink-100',
          textNormal: 'text-pink-700',
          bgSelected: 'bg-gray-700',
          textSelected: 'text-white',
          bgEarliest: 'bg-gray-700',
          textEarliest: 'text-white',
          bgLatest: 'bg-pink-700',
          textLatest: 'text-white'
        };
      case 'dhuhr':
        return {
          bgNormal: 'bg-amber-100',
          textNormal: 'text-amber-700',
          bgSelected: 'bg-gray-700',
          textSelected: 'text-white',
          bgEarliest: 'bg-gray-700',
          textEarliest: 'text-white',
          bgLatest: 'bg-amber-700',
          textLatest: 'text-white'
        };
      case 'asr':
        return {
          bgNormal: 'bg-teal-100',
          textNormal: 'text-teal-700',
          bgSelected: 'bg-gray-700',
          textSelected: 'text-white',
          bgEarliest: 'bg-gray-700',
          textEarliest: 'text-white',
          bgLatest: 'bg-teal-700',
          textLatest: 'text-white'
        };
      case 'isha':
        return {
          bgNormal: 'bg-indigo-100',
          textNormal: 'text-indigo-700',
          bgSelected: 'bg-gray-700',
          textSelected: 'text-white',
          bgEarliest: 'bg-gray-700',
          textEarliest: 'text-white',
          bgLatest: 'bg-indigo-700',
          textLatest: 'text-white'
        };
      default:
        return {
          bgNormal: 'bg-gray-100',
          textNormal: 'text-gray-700',
          bgSelected: 'bg-gray-700',
          textSelected: 'text-white',
          bgEarliest: 'bg-gray-700',
          textEarliest: 'text-white',
          bgLatest: 'bg-gray-700',
          textLatest: 'text-white'
        };
    }
  };

  const colors = getPrayerColors();

  const getTimeClass = (time: string) => {
    let baseClass = 'p-2 rounded text-center cursor-pointer';
    
    // Selected state - gray background with white text as requested
    if (time === selectedTime) {
      return `${baseClass} ${colors.bgSelected} ${colors.textSelected}`;
    }
    
    // Earliest time - same as selected block (gray) with white text
    if (earliestTime && time === earliestTime.time) {
      return `${baseClass} ${colors.bgEarliest} ${colors.textEarliest}`;
    }
    
    // Latest time - dark shade of prayer color with white text
    if (latestTime && time === latestTime.time) {
      return `${baseClass} ${colors.bgLatest} ${colors.textLatest}`;
    }
    
    // Default
    return `${baseClass} ${colors.bgNormal} hover:bg-gray-200 ${colors.textNormal}`;
  };

  // Always use grid with 3 columns for both mobile and desktop
  return (
    <div className="mt-4">
      <div className="grid grid-cols-3 gap-2">
        {times.map((time) => (
          <div
            key={time}
            className={getTimeClass(time)}
            onClick={() => onSelectTime(time)}
          >
            {time}
            {/* Removed the EARLIEST and LATEST badges as requested */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSelectionGrid;
