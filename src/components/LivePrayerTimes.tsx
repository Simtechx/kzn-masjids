
import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { MapPin, Clock, Sun, Sunrise, Sunset, Moon } from 'lucide-react';

interface PrayerTime {
  name: string;
  time: string;
  timestamp: number;
  icon?: React.ReactNode;
  bgColor: string;
  textColor: string;
}

const LivePrayerTimes = () => {
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
      name: 'Asr (H)', 
      time: '3:30 pm', 
      timestamp: new Date().setHours(15, 30, 0, 0), 
      icon: <Sun size={40} className="mb-2 text-orange-300" />,
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    },
    { 
      name: 'Asr (S)', 
      time: '4:00 pm', 
      timestamp: new Date().setHours(16, 0, 0, 0), 
      icon: <Sun size={40} className="mb-2 text-orange-300" />,
      bgColor: 'bg-emerald-100',
      textColor: 'text-emerald-600'
    },
    { 
      name: 'Maghrib', 
      time: '5:45 pm', 
      timestamp: new Date().setHours(17, 45, 0, 0), 
      icon: <Sunset size={40} className="mb-2 text-orange-500" />,
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
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

  // Get background image based on upcoming prayer
  const getBackgroundImage = () => {
    if (!upcomingPrayer) return "";
    
    switch(upcomingPrayer.name) {
      case 'Fajr':
        return "url('https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80')";
      case 'Dhuhr':
        return "url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80')";
      case 'Asr (H)':
      case 'Asr (S)':
        return "url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80')";
      case 'Maghrib':
        return "url('https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80')";
      case 'Isha':
        return "url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&q=80')";
      default:
        return "";
    }
  };

  return (
    <div className="bg-islamic-pattern">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-lg overflow-hidden">
          {/* Left side - Upcoming Prayer with background image */}
          <div 
            className="rounded-lg relative overflow-hidden"
            style={{ position: 'relative' }}
          >
            <div 
              className="absolute inset-0" 
              style={{
                backgroundImage: getBackgroundImage(),
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            {/* Added darker overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/60"></div>
            
            <div className="p-6 text-white relative z-10">
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
                {/* Semi-transparent dark background for the countdown */}
                <div className="bg-black/40 rounded-lg p-3 inline-block">
                  <div className="text-5xl font-bold">{timeRemaining}</div>
                </div>
                <Progress value={remainingPercentage} className="h-2 bg-white/30 mt-3" />
                <div className="mt-4 inline-block bg-black/50 py-2 px-4 rounded-md">
                  <span>Location-based times</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Today's Prayer Times with new color blocks */}
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
        </div>
      </div>
    </div>
  );
};

export default LivePrayerTimes;
