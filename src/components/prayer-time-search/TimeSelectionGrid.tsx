
import React from 'react';
import { PrayerType, getUniquePrayerTimes, findExtremeTime } from '@/utils/prayerTimeUtils';

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
  
  // Find earliest and latest times for gradient effect
  const earliestTime = findExtremeTime(activePrayer, 'earliest', selectedRegion)?.time || '';
  const latestTime = findExtremeTime(activePrayer, 'latest', selectedRegion)?.time || '';

  // Define color themes for each prayer type
  const colorThemes = {
    fajr: {
      base: 'bg-pink-50',
      hover: 'hover:bg-pink-100',
      earliest: 'bg-pink-100',
      middle: 'bg-pink-200',
      latest: 'bg-pink-300',
      selected: 'bg-[#14615f] text-white',
    },
    dhuhr: {
      base: 'bg-amber-50',
      hover: 'hover:bg-amber-100',
      earliest: 'bg-amber-100',
      middle: 'bg-amber-200',
      latest: 'bg-amber-300',
      selected: 'bg-[#14615f] text-white',
    },
    asr: {
      base: 'bg-emerald-50',
      hover: 'hover:bg-emerald-100',
      earliest: 'bg-emerald-100',
      middle: 'bg-emerald-200',
      latest: 'bg-emerald-300',
      selected: 'bg-[#14615f] text-white',
    },
    isha: {
      base: 'bg-indigo-50',
      hover: 'hover:bg-indigo-100',
      earliest: 'bg-indigo-100',
      middle: 'bg-indigo-200',
      latest: 'bg-indigo-300',
      selected: 'bg-[#14615f] text-white',
    },
  };
  
  // Get the appropriate color theme for the current prayer
  const theme = colorThemes[activePrayer];

  // Determine the color based on time's position in the sequence
  const getTimeColor = (time: string) => {
    if (selectedTime === time) {
      return theme.selected;
    }
    
    if (time === earliestTime) {
      return theme.earliest;
    }
    
    if (time === latestTime) {
      return theme.latest;
    }
    
    // Middle shade for times in between
    const timeIndex = uniquePrayerTimes.indexOf(time);
    const totalTimes = uniquePrayerTimes.length;
    
    // For times in the middle, use middle shade
    if (totalTimes > 2 && timeIndex > 0 && timeIndex < totalTimes - 1) {
      return theme.middle;
    }
    
    return theme.base;
  };

  return (
    <div className="mb-6">
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
        {uniquePrayerTimes.map((time, index) => {
          const isEarliest = time === earliestTime;
          const isLatest = time === latestTime;
          const timeColor = getTimeColor(time);
          
          return (
            <div 
              key={index}
              className={`p-2 rounded text-center cursor-pointer ${timeColor}`}
              onClick={() => onSelectTime(time)}
            >
              <div>{time}</div>
              {(isEarliest || isLatest) && (
                <div className="text-xs mt-1 font-medium">
                  {isEarliest ? 'EARLIEST' : isLatest ? 'LATEST' : ''}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSelectionGrid;
