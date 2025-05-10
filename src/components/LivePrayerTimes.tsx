
import React from 'react';
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

  return (
    <div className="bg-islamic-pattern">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-lg overflow-hidden">
          {/* Left side - Upcoming Prayer with background image */}
          <UpcomingPrayer
            upcomingPrayer={upcomingPrayer}
            currentLocation={currentLocation}
            timeRemaining={timeRemaining}
            remainingPercentage={remainingPercentage}
          />
          
          {/* Right side - Today's Prayer Times */}
          <TodaysPrayers todayPrayerTimes={todayPrayerTimes} />
        </div>
      </div>
    </div>
  );
};

export default LivePrayerTimes;
