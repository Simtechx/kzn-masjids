
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

  // Reorder times to ensure earliest is first and latest is last
  const orderedTimes = [...uniquePrayerTimes].sort((a, b) => {
    if (a === earliestTime) return -1;
    if (b === earliestTime) return 1;
    if (a === latestTime) return 1;
    if (b === latestTime) return -1;
    return uniquePrayerTimes.indexOf(a) - uniquePrayerTimes.indexOf(b);
  });

  // Define color themes for each prayer type
  const colorThemes = {
    fajr: {
      base: 'bg-pink-50',
      hover: 'hover:bg-pink-100',
      earliest: 'bg-pink-100',
      middle: 'bg-pink-200',
      latest: 'bg-pink-300',
      selected: 'bg-gray-800 text-white font-medium',
      next: 'bg-[#FEF7CD] font-medium border border-pink-300',
    },
    dhuhr: {
      base: 'bg-amber-50',
      hover: 'hover:bg-amber-100',
      earliest: 'bg-amber-100',
      middle: 'bg-amber-200',
      latest: 'bg-amber-300',
      selected: 'bg-gray-800 text-white font-medium',
      next: 'bg-[#FEF7CD] font-medium border border-amber-300',
    },
    asr: {
      base: 'bg-teal-50',
      hover: 'hover:bg-teal-100',
      earliest: 'bg-teal-100',
      middle: 'bg-teal-200',
      latest: 'bg-teal-300',
      selected: 'bg-gray-800 text-white font-medium',
      next: 'bg-[#FEF7CD] font-medium border border-teal-300',
    },
    isha: {
      base: 'bg-indigo-50',
      hover: 'hover:bg-indigo-100',
      earliest: 'bg-indigo-100',
      middle: 'bg-indigo-200',
      latest: 'bg-indigo-300',
      selected: 'bg-gray-800 text-white font-medium',
      next: 'bg-[#FEF7CD] font-medium border border-indigo-300',
    },
  };
  
  // Get the appropriate color theme for the current prayer
  const theme = colorThemes[activePrayer];

  // Find the next prayer time (closest time that is later than current time)
  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };
  
  const currentTime = getCurrentTime();
  const nextPrayerTime = orderedTimes.find(time => time > currentTime) || orderedTimes[0];

  // Determine the color based on time's position in the sequence
  const getTimeColor = (time: string) => {
    if (selectedTime === time) {
      return theme.selected;
    }

    if (time === nextPrayerTime && !selectedTime) {
      return theme.next;
    }
    
    if (time === earliestTime) {
      return theme.earliest;
    }
    
    if (time === latestTime) {
      return theme.latest;
    }
    
    // Middle shade for times in between
    return theme.base;
  };

  return (
    <div className="mb-6">
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
        {orderedTimes.map((time, index) => {
          const isEarliest = time === earliestTime;
          const isLatest = time === latestTime;
          const isNext = time === nextPrayerTime && !selectedTime;
          const timeColor = getTimeColor(time);
          
          return (
            <div 
              key={index}
              className={`p-2 rounded text-center cursor-pointer transition-all ${timeColor} hover:opacity-90`}
              onClick={() => onSelectTime(time)}
            >
              <div>{time}</div>
              {isEarliest && <div className="text-xs mt-1 font-medium">EARLIEST</div>}
              {isLatest && <div className="text-xs mt-1 font-medium">LATEST</div>}
              {isNext && !isEarliest && !isLatest && <div className="text-xs mt-1 font-medium">NEXT</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSelectionGrid;
