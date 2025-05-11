
import React, { useEffect } from 'react';
import UpcomingPrayer from './prayer-times/UpcomingPrayer';
import TodaysPrayers from './prayer-times/TodaysPrayers';
import { usePrayerTimes } from './prayer-times/usePrayerTimes';

const LivePrayerTimes = () => {
  const {
    currentLocation,
    upcomingPrayer,
    timeRemaining,
    remainingPercentage,
    todayPrayerTimes
  } = usePrayerTimes();

  // Extra logging to help debug upcoming prayer issues
  useEffect(() => {
    console.log('LivePrayerTimes - Upcoming Prayer:', upcomingPrayer); 
    console.log('Today Prayer Times:', todayPrayerTimes);
    console.log('Current time:', new Date().toLocaleTimeString());
    
    // Log each prayer's timestamp compared to now
    const now = new Date().getTime();
    todayPrayerTimes.forEach(prayer => {
      console.log(`Prayer: ${prayer.name}, Time: ${prayer.time}, Is Future: ${prayer.timestamp > now}`);
    });
  }, [upcomingPrayer, todayPrayerTimes]);

  return (
    <div className="bg-white text-black">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-lg overflow-hidden">
          {/* Left side - Upcoming Salaah with background image */}
          <UpcomingPrayer
            upcomingPrayer={upcomingPrayer}
            currentLocation={currentLocation}
            timeRemaining={timeRemaining}
            remainingPercentage={remainingPercentage}
          />
          
          {/* Right side - Today's Salaah Times */}
          <TodaysPrayers todayPrayerTimes={todayPrayerTimes} />
        </div>
      </div>
    </div>
  );
};

export default LivePrayerTimes;
