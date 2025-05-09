
import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { MapPin, Clock, Sun, Sunrise, Sunset, Moon } from 'lucide-react';

interface PrayerTime {
  name: string;
  time: string;
  timestamp: number;
  icon?: React.ReactNode;
}

const LivePrayerTimes = () => {
  const [currentLocation, setCurrentLocation] = useState('Durban, South Africa');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [upcomingPrayer, setUpcomingPrayer] = useState<PrayerTime | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [remainingPercentage, setRemainingPercentage] = useState<number>(0);
  const [todayPrayerTimes, setTodayPrayerTimes] = useState<PrayerTime[]>([
    { name: 'Fajr', time: '3:15 am', timestamp: new Date().setHours(3, 15, 0, 0), icon: <Sunrise size={40} className="mb-2 text-amber-300" /> },
    { name: 'Dhuhr', time: '11:30 am', timestamp: new Date().setHours(11, 30, 0, 0), icon: <Sun size={40} className="mb-2 text-yellow-400" /> },
    { name: 'Asr (H)', time: '3:30 pm', timestamp: new Date().setHours(15, 30, 0, 0), icon: <Sun size={40} className="mb-2 text-orange-300" /> },
    { name: 'Asr (S)', time: '4:00 pm', timestamp: new Date().setHours(16, 0, 0, 0), icon: <Sun size={40} className="mb-2 text-orange-300" /> },
    { name: 'Maghrib', time: '5:45 pm', timestamp: new Date().setHours(17, 45, 0, 0), icon: <Sunset size={40} className="mb-2 text-orange-500" /> },
    { name: 'Isha', time: '6:40 pm', timestamp: new Date().setHours(18, 40, 0, 0), icon: <Moon size={40} className="mb-2 text-blue-200" /> }
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

  return (
    <div className="bg-islamic-pattern">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-lg overflow-hidden">
          {/* Left side - Upcoming Prayer */}
          <div className="bg-islamic-green p-6 text-white rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h2 className="text-xl font-medium">Upcoming Prayer</h2>
                {upcomingPrayer?.icon}
                <h1 className="text-5xl font-bold mt-2">{upcomingPrayer?.name}</h1>
                <div className="mt-1 text-white/80">
                  In {timeRemaining.split(':')[0]} hours {timeRemaining.split(':')[1]} mins
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end mb-1">
                  <MapPin size={16} className="mr-1" />
                  <span>{currentLocation}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <div className="text-white/90 mb-1">Time remaining</div>
              <div className="text-5xl font-bold mb-3">{timeRemaining}</div>
              <Progress value={remainingPercentage} className="h-2 bg-white/30" />
              <div className="mt-4 inline-block bg-white/20 py-2 px-4 rounded-md">
                <span>Location-based times</span>
              </div>
            </div>
          </div>
          
          {/* Right side - Today's Prayer Times */}
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-medium text-gray-800 mb-4">Today's Prayer Times</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-pink-50 rounded-lg p-4">
                <div className="text-islamic-green">Fajr</div>
                <div className="text-2xl font-semibold">{todayPrayerTimes[0].time}</div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-islamic-green">Dhuhr</div>
                <div className="text-2xl font-semibold">{todayPrayerTimes[1].time}</div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-islamic-green">Asr (H)</div>
                <div className="text-2xl font-semibold">{todayPrayerTimes[2].time}</div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-islamic-green">Asr (S)</div>
                <div className="text-2xl font-semibold">{todayPrayerTimes[3].time}</div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-islamic-green">Maghrib</div>
                <div className="text-2xl font-semibold">{todayPrayerTimes[4].time}</div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-islamic-green">Isha</div>
                <div className="text-2xl font-semibold">{todayPrayerTimes[5].time}</div>
              </div>
              
              <div className="col-span-2 mt-2">
                <div className="text-sm text-gray-500">Calculation Method: Umm Al-Qura</div>
                <div className="text-sm text-gray-500">Juristic Method: Hanafi</div>
                <button className="text-islamic-blue text-sm mt-2">Change Settings</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePrayerTimes;
