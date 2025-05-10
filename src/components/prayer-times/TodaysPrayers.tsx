
import React from 'react';
import { PrayerTime } from '@/components/prayer-times/types';

interface TodaysPrayersProps {
  todayPrayerTimes: PrayerTime[];
}

const TodaysPrayers: React.FC<TodaysPrayersProps> = ({ todayPrayerTimes }) => {
  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-xl font-medium text-gray-800 mb-4">Today's Prayer Times</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {todayPrayerTimes.map((prayer, index) => (
          <div key={index} className={`${prayer.bgColor} rounded-lg p-4`}>
            <div className={prayer.textColor}>{prayer.name}</div>
            <div className="text-2xl font-semibold text-gray-800">{prayer.time}</div>
          </div>
        ))}
        
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
