
import React from 'react';
import { PrayerTime } from '@/components/prayer-times/types';

interface TodaysPrayersProps {
  todayPrayerTimes: PrayerTime[];
}

const TodaysPrayers: React.FC<TodaysPrayersProps> = ({ todayPrayerTimes }) => {
  // Function to determine background and text color based on prayer name
  const getPrayerColors = (prayerName: string) => {
    if (prayerName.includes('Maghrib')) {
      return {
        bgColor: 'bg-red-50',
        textColor: 'text-red-600'
      };
    } else if (prayerName.includes('Asr')) {
      return {
        bgColor: 'bg-teal-50',
        textColor: 'text-teal-600'
      };
    }
    
    // Return the original colors for other prayers
    const prayer = todayPrayerTimes.find(p => p.name === prayerName);
    return {
      bgColor: prayer?.bgColor || 'bg-gray-50',
      textColor: prayer?.textColor || 'text-gray-600'
    };
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-xl font-medium text-gray-800 mb-4">Today's Prayer Times</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {todayPrayerTimes.map((prayer, index) => {
          // Get custom colors for Maghrib and Asr
          const { bgColor, textColor } = prayer.name.includes('Maghrib') || prayer.name.includes('Asr') 
            ? getPrayerColors(prayer.name)
            : { bgColor: prayer.bgColor, textColor: prayer.textColor };
            
          return (
            <div key={index} className={`${bgColor} rounded-lg p-4`}>
              <div className={textColor}>{prayer.name}</div>
              <div className="text-2xl font-semibold text-gray-800">{prayer.time}</div>
            </div>
          );
        })}
        
        <div className="col-span-2 mt-2">
          <div className="text-sm text-gray-500">Calculation Method: Umm Al-Qura</div>
          <div className="text-sm text-gray-500">Juristic Method: Hanafi</div>
          <button className="text-[#14615f] text-sm mt-2">Change Settings</button>
        </div>
      </div>
    </div>
  );
};

export default TodaysPrayers;
