
import React from 'react';
import { PrayerTime } from '@/components/prayer-times/types';

interface TodaysPrayersProps {
  todayPrayerTimes: PrayerTime[];
}

const TodaysPrayers: React.FC<TodaysPrayersProps> = ({ todayPrayerTimes }) => {
  // Reorder prayers to put Asr (S) before Asr (H)
  const reorderedPrayers = [...todayPrayerTimes].sort((a, b) => {
    // Special case for Asr prayers - swap their order
    if (a.name === 'Asr (S)' && b.name === 'Asr (H)') {
      return -1;
    }
    if (a.name === 'Asr (H)' && b.name === 'Asr (S)') {
      return 1;
    }
    
    // Default ordering for other prayers
    return todayPrayerTimes.indexOf(a) - todayPrayerTimes.indexOf(b);
  });
  
  // Function to determine if a prayer is the upcoming prayer
  const isUpcoming = (prayerName: string) => {
    const upcomingPrayer = todayPrayerTimes.find(p => {
      const now = new Date().getTime();
      return p.timestamp > now;
    });
    return upcomingPrayer?.name === prayerName;
  };

  // Function to determine background and text color based on prayer name
  const getPrayerColors = (prayerName: string) => {
    // Check if this is the upcoming prayer
    const upcoming = isUpcoming(prayerName);
    
    if (prayerName === 'Asr (S)') {
      return {
        bgColor: upcoming ? 'bg-green-700' : 'bg-green-50',
        textColor: upcoming ? 'text-white' : 'text-green-600'
      };
    } else if (prayerName === 'Asr (H)') {
      return {
        bgColor: upcoming ? 'bg-teal-800' : 'bg-teal-100', // Darker turquoise for Asr (H)
        textColor: upcoming ? 'text-white' : 'text-teal-800'
      };
    } else if (prayerName.includes('Maghrib')) {
      return {
        bgColor: upcoming ? 'bg-red-700' : 'bg-red-50',
        textColor: upcoming ? 'text-white' : 'text-red-600'
      };
    }
    
    // Return the original colors for other prayers, but darken if it's the upcoming prayer
    const prayer = todayPrayerTimes.find(p => p.name === prayerName);
    const bgColor = prayer?.bgColor || 'bg-gray-50';
    
    if (upcoming) {
      // Darken the background for upcoming prayers
      return {
        bgColor: bgColor.replace('50', '700'),
        textColor: 'text-white'
      };
    }
    
    return {
      bgColor: prayer?.bgColor || 'bg-gray-50',
      textColor: prayer?.textColor || 'text-gray-600'
    };
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-xl font-medium text-gray-800 mb-4">Today's Prayer Times</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {reorderedPrayers.map((prayer, index) => {
          // Get custom colors for prayers
          const { bgColor, textColor } = getPrayerColors(prayer.name);
          const upcoming = isUpcoming(prayer.name);
            
          return (
            <div key={index} className={`${bgColor} rounded-lg p-4 relative overflow-hidden`}>
              {upcoming && (
                <div className="absolute top-0 right-0">
                  <div className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-bl-md font-semibold">
                    UPCOMING
                  </div>
                </div>
              )}
              <div className={textColor}>{prayer.name}</div>
              <div className={`text-2xl font-semibold ${isUpcoming(prayer.name) ? 'text-white' : 'text-gray-800'}`}>{prayer.time}</div>
            </div>
          );
        })}
        
        <div className="col-span-2 mt-2">
          <div className="text-sm text-gray-500">Calculation Method: Umm Al-Qura</div>
          <div className="text-sm text-gray-500">Juristic Method: Hanafi</div>
          <button className="text-[#072c23] text-sm mt-2">Change Settings</button>
        </div>
      </div>
    </div>
  );
};

export default TodaysPrayers;
