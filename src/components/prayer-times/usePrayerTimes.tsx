
import { useState, useEffect } from 'react';
import { Sunrise, Sun, Sunset, Moon } from 'lucide-react';
import { PrayerTime } from '@/components/prayer-times/types';

export function usePrayerTimes() {
  const [currentLocation, setCurrentLocation] = useState('Durban, South Africa');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [upcomingPrayer, setUpcomingPrayer] = useState<PrayerTime | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [remainingPercentage, setRemainingPercentage] = useState<number>(0);
  const [todayPrayerTimes, setTodayPrayerTimes] = useState<PrayerTime[]>([
    { 
      name: 'Fajr', 
      time: '3:15 am', 
      timestamp: new Date().setHours(3, 15, 0, 0), 
      icon: <Sunrise size={40} className="mb-2 text-amber-300" />,
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600'
    },
    { 
      name: 'Dhuhr', 
      time: '11:30 am', 
      timestamp: new Date().setHours(11, 30, 0, 0), 
      icon: <Sun size={40} className="mb-2 text-yellow-400" />,
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600'
    },
    { 
      name: 'Asr (S)', 
      time: '3:30 pm', 
      timestamp: new Date().setHours(15, 30, 0, 0), 
      icon: <Sun size={40} className="mb-2 text-orange-300" />,
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    { 
      name: 'Asr (H)', 
      time: '4:00 pm', 
      timestamp: new Date().setHours(16, 0, 0, 0), 
      icon: <Sun size={40} className="mb-2 text-orange-300" />,
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600'
    },
    { 
      name: 'Maghrib', 
      time: '5:45 pm', 
      timestamp: new Date().setHours(17, 45, 0, 0), 
      icon: <Sunset size={40} className="mb-2 text-orange-500" />,
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    },
    { 
      name: 'Isha', 
      time: '6:40 pm', 
      timestamp: new Date().setHours(18, 40, 0, 0), 
      icon: <Moon size={40} className="mb-2 text-blue-200" />,
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600'
    }
  ]);

  useEffect(() => {
    // Find upcoming prayer
    const findUpcomingPrayer = () => {
      const now = new Date().getTime();
      const sortedPrayers = [...todayPrayerTimes];
      
      // Find the next prayer time
      const nextPrayer = sortedPrayers.find(prayer => prayer.timestamp > now);
      
      if (nextPrayer) {
        setUpcomingPrayer(nextPrayer);
        
        // Calculate time remaining
        const remainingMs = nextPrayer.timestamp - now;
        const remainingHours = Math.floor(remainingMs / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
        const remainingSeconds = Math.floor((remainingMs % (1000 * 60)) / 1000);
        
        setTimeRemaining(`${String(remainingHours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`);
        
        // Calculate percentage for progress bar
        const currentPrayerIndex = nextPrayer ? todayPrayerTimes.indexOf(nextPrayer) - 1 : todayPrayerTimes.length - 1;
        const currentPrayer = currentPrayerIndex >= 0 ? todayPrayerTimes[currentPrayerIndex] : todayPrayerTimes[todayPrayerTimes.length - 1];
        
        const totalInterval = nextPrayer.timestamp - currentPrayer.timestamp;
        const elapsed = now - currentPrayer.timestamp;
        const percentage = Math.max(0, Math.min(100, (elapsed / totalInterval) * 100));
        
        setRemainingPercentage(percentage);
      } else {
        // If all prayers for today have passed, use the first prayer of tomorrow
        const tomorrowFajr = { 
          ...todayPrayerTimes[0],
          timestamp: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(3, 15, 0, 0)
        };
        
        setUpcomingPrayer(tomorrowFajr);
        
        // Calculate time remaining until tomorrow's Fajr
        const remainingMs = tomorrowFajr.timestamp - now;
        const remainingHours = Math.floor(remainingMs / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
        const remainingSeconds = Math.floor((remainingMs % (1000 * 60)) / 1000);
        
        setTimeRemaining(`${String(remainingHours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`);
        
        // Calculate percentage for progress bar - from Isha to tomorrow's Fajr
        const ishaTime = todayPrayerTimes[todayPrayerTimes.length - 1].timestamp;
        const totalInterval = tomorrowFajr.timestamp - ishaTime;
        const elapsed = now - ishaTime;
        const percentage = Math.max(0, Math.min(100, (elapsed / totalInterval) * 100));
        
        setRemainingPercentage(percentage);
      }
    };

    // Update time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      findUpcomingPrayer();
    }, 1000);

    // Initial call
    findUpcomingPrayer();

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
