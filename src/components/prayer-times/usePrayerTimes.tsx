import { useState, useEffect } from 'react';
import { Sunrise, Sun, Sunset, Moon } from 'lucide-react';
import { PrayerTime } from '@/components/prayer-times/types';
import { toast } from 'sonner';

export function usePrayerTimes() {
  const [currentLocation, setCurrentLocation] = useState('Durban, South Africa');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [upcomingPrayer, setUpcomingPrayer] = useState<PrayerTime | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [remainingPercentage, setRemainingPercentage] = useState<number>(0);
  const [todayPrayerTimes, setTodayPrayerTimes] = useState<PrayerTime[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      setIsLoading(true);
      try {
        // Use the specific Durban API URL
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=Durban&country=South Africa&method=2`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch prayer times');
        }

        const data = await response.json();
        console.log('Aladhan API response for Durban:', data);
        
        if (data && data.data && data.data.timings) {
          const timings = data.data.timings;
          
          // Format time function (convert from 24h format like "05:15" to "5:15 am")
          const formatTime = (timeStr: string) => {
            if (!timeStr) return '';
            const [hours, minutes] = timeStr.split(':').map(Number);
            const period = hours >= 12 ? 'pm' : 'am';
            const displayHours = hours % 12 === 0 ? 12 : hours % 12;
            return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
          };
          
          // Parse time string to get timestamp (used for countdown)
          const getTimestamp = (timeStr: string) => {
            if (!timeStr) return 0;
            const [hours, minutes] = timeStr.split(':').map(Number);
            const now = new Date();
            return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0, 0).getTime();
          };
          
          // Create prayer times array from the API data
          const prayerTimes: PrayerTime[] = [
            { 
              name: 'Fajr', 
              time: formatTime(timings.Fajr), 
              timestamp: getTimestamp(timings.Fajr),
              icon: <Sunrise size={40} className="mb-2 text-amber-300" />,
              bgColor: 'bg-pink-50',
              textColor: 'text-pink-600'
            },
            { 
              name: 'Dhuhr', 
              time: formatTime(timings.Dhuhr), 
              timestamp: getTimestamp(timings.Dhuhr),
              icon: <Sun size={40} className="mb-2 text-yellow-400" />,
              bgColor: 'bg-amber-50',
              textColor: 'text-amber-600'
            },
            { 
              name: 'Asr (S)', 
              time: formatTime(timings.Asr), 
              timestamp: getTimestamp(timings.Asr),
              icon: <Sun size={40} className="mb-2 text-orange-300" />,
              bgColor: 'bg-green-50',
              textColor: 'text-green-600'
            },
            { 
              name: 'Asr (H)', 
              // Hanafi Asr is typically 20-30 minutes after standard Asr
              time: formatTime(adjustTime(timings.Asr, 20)), 
              timestamp: getTimestamp(adjustTime(timings.Asr, 20)),
              icon: <Sun size={40} className="mb-2 text-orange-300" />,
              bgColor: 'bg-teal-50',
              textColor: 'text-teal-600'
            },
            { 
              name: 'Maghrib', 
              time: formatTime(timings.Maghrib), 
              timestamp: getTimestamp(timings.Maghrib),
              icon: <Sunset size={40} className="mb-2 text-orange-500" />,
              bgColor: 'bg-red-50',
              textColor: 'text-red-600'
            },
            { 
              name: 'Isha', 
              time: formatTime(timings.Isha), 
              timestamp: getTimestamp(timings.Isha),
              icon: <Moon size={40} className="mb-2 text-blue-200" />,
              bgColor: 'bg-indigo-50',
              textColor: 'text-indigo-600'
            }
          ];
          
          setTodayPrayerTimes(prayerTimes);
          setCurrentLocation('Durban, KZN South Africa');
          toast.success('Live prayer times loaded for Durban');
        } else {
          console.error('Invalid data format from aladhan.com API');
          toast.error('Could not load prayer times');
          // Set fallback prayer times
          setupFallbackPrayerTimes();
        }
      } catch (error) {
        console.error('Error fetching prayer times:', error);
        toast.error('Failed to load prayer times');
        // Set fallback prayer times
        setupFallbackPrayerTimes();
      } finally {
        setIsLoading(false);
      }
    };

    // Helper function to adjust time by minutes
    const adjustTime = (timeStr: string, addMinutes: number) => {
      if (!timeStr) return '';
      const [hours, minutes] = timeStr.split(':').map(Number);
      
      const date = new Date();
      date.setHours(hours, minutes + addMinutes, 0, 0);
      
      return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    };

    // Fallback prayer times setup
    const setupFallbackPrayerTimes = () => {
      setTodayPrayerTimes([
        { 
          name: 'Fajr', 
          time: '5:15 am', 
          timestamp: getCurrentDayTimestamp(5, 15),
          icon: <Sunrise size={40} className="mb-2 text-amber-300" />,
          bgColor: 'bg-pink-50',
          textColor: 'text-pink-600'
        },
        { 
          name: 'Dhuhr', 
          time: '12:30 pm', 
          timestamp: getCurrentDayTimestamp(12, 30),
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
          time: '7:15 pm', 
          timestamp: getCurrentDayTimestamp(19, 15),
          icon: <Moon size={40} className="mb-2 text-blue-200" />,
          bgColor: 'bg-indigo-50',
          textColor: 'text-indigo-600'
        }
      ]);
    };

    // Set timestamps for demo purposes - using fixed times
    const getCurrentDayTimestamp = (hour: number, minute: number) => {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0, 0).getTime();
    };
    
    fetchPrayerTimes();

    // Keep updating time for realistic display
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (todayPrayerTimes.length === 0) return;
    
    // Find the upcoming prayer
    const now = new Date().getTime();
    const nextPrayer = todayPrayerTimes.find(prayer => prayer.timestamp > now);
    
    if (nextPrayer) {
      setUpcomingPrayer(nextPrayer);
      
      // Calculate time remaining
      const diff = nextPrayer.timestamp - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeRemaining(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      
      // Calculate remaining percentage (assuming 6 hours between prayers on average)
      const sixHoursInMs = 6 * 60 * 60 * 1000;
      const remainingPercent = Math.max(0, Math.min(100, 100 - (diff / sixHoursInMs * 100)));
      setRemainingPercentage(remainingPercent);
    } else {
      // If no upcoming prayer found (all prayers for today are past), use the first prayer of the next day
      const firstPrayer = todayPrayerTimes[0]; // Typically Fajr
      setUpcomingPrayer(firstPrayer);
      
      // Set mock time remaining for tomorrow's Fajr
      setTimeRemaining("08:00:00");
      setRemainingPercentage(20);
    }
  }, [currentTime, todayPrayerTimes]);

  return {
    currentLocation,
    currentTime,
    upcomingPrayer,
    timeRemaining,
    remainingPercentage,
    todayPrayerTimes,
    isLoading
  };
}
