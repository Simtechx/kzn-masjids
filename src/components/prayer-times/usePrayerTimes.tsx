import { useState, useEffect } from 'react';
import { Sunrise, Sun, Sunset, Moon } from 'lucide-react';
import { PrayerTime } from '@/components/prayer-times/types';

export function usePrayerTimes() {
  const [currentLocation, setCurrentLocation] = useState('Durban, South Africa');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [upcomingPrayer, setUpcomingPrayer] = useState<PrayerTime | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [remainingPercentage, setRemainingPercentage] = useState<number>(0);
  
  // Set timestamps for demo purposes - using fixed times that will always show one as upcoming
  const getCurrentDayTimestamp = (hour: number, minute: number) => {
    const now = new Date();
    const timestamp = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0, 0).getTime();
    
    // For demo purposes - ensure at least one prayer is upcoming by adjusting timestamps
    // Make Fajr always upcoming if the current time is after all prayers for today
    const isAfterLastPrayer = now.getHours() >= 19;
    if (hour === 3 && isAfterLastPrayer) {
      // Set to tomorrow's Fajr
      return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, hour, minute, 0, 0).getTime();
    }
    
    return timestamp;
  };
  
  const [todayPrayerTimes, setTodayPrayerTimes] = useState<PrayerTime[]>([
    { 
      name: 'Fajr', 
      time: '3:15 am', 
      timestamp: getCurrentDayTimestamp(3, 15),
      icon: <Sunrise size={40} className="mb-2 text-amber-300" />,
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600'
    },
    { 
      name: 'Dhuhr', 
      time: '11:30 am', 
      timestamp: getCurrentDayTimestamp(11, 30),
      icon: <Sun size={40} className="mb-2 text-yellow-400" />,
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600'
    },
    { 
      name: 'Asr (S)', 
      time: '3:30 pm', 
      timestamp: getCurrentDayTimestamp(15, 30),
      icon: <Sun size={40} className="mb-2 text-orange-300" />,
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    { 
      name: 'Asr (H)', 
      time: '4:00 pm', 
      timestamp: getCurrentDayTimestamp(16, 0),
      icon: <Sun size={40} className="mb-2 text-orange-300" />,
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600'
    },
    { 
      name: 'Maghrib', 
      time: '5:45 pm', 
      timestamp: getCurrentDayTimestamp(17, 45),
      icon: <Sunset size={40} className="mb-2 text-orange-500" />,
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    },
    { 
      name: 'Isha', 
      time: '6:40 pm', 
      timestamp: getCurrentDayTimestamp(18, 40),
      icon: <Moon size={40} className="mb-2 text-blue-200" />,
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600'
    }
  ]);

  useEffect(() => {
    // For demo purposes, ensure Fajr is always upcoming
    const forceUpcoming = () => {
      // Force Fajr to be the upcoming prayer for demonstration
      const fajrPrayer = todayPrayerTimes.find(p => p.name === 'Fajr');
      if (fajrPrayer) {
        console.log("Forcing Fajr to be upcoming for demonstration");
        setUpcomingPrayer(fajrPrayer);
        
        // Set mock time remaining
        setTimeRemaining("04:30:15");
        
        // Set mock percentage
        setRemainingPercentage(65);
      }
    };

    forceUpcoming();
    
    // Original logic remains but is not active for demo
    const findUpcomingPrayer = () => {
      const now = new Date().getTime();
      
      // Find the next prayer time
      const nextPrayer = todayPrayerTimes.find(prayer => prayer.timestamp > now);
      
      if (nextPrayer) {
        // Not using for demo, but keeping code
        console.log("Found upcoming prayer:", nextPrayer.name);
      } 
    };

    // Keep updating time for realistic display
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [todayPrayerTimes]);

  return {
    currentLocation,
    currentTime,
    upcomingPrayer,
    timeRemaining,
    remainingPercentage,
    todayPrayerTimes
  };
}
