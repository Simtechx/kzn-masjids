
import React from 'react';
import UpcomingPrayer from './prayer-times/UpcomingPrayer';
import TodaysPrayers from './prayer-times/TodaysPrayers';
import { usePrayerTimes } from './prayer-times/usePrayerTimes';
import { Loader2 } from 'lucide-react';

const LivePrayerTimes = () => {
  const {
    currentLocation,
    upcomingPrayer,
    timeRemaining,
    remainingPercentage,
    todayPrayerTimes,
    isLoading
  } = usePrayerTimes();

  if (isLoading) {
    return (
      <div className="bg-white text-black">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-center items-center h-48">
            <div className="flex flex-col items-center">
              <Loader2 className="h-10 w-10 text-teal-600 animate-spin mb-4" />
              <p className="text-gray-600">Loading prayer times...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
