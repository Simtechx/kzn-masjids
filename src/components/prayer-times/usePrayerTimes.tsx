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

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      setIsLoading(true);
      try {
        // Fetch prayer times from the provided API
        const response = await fetch("https://script.google.com/macros/s/AKfycbydNRfcb9EIvG0Q5JMnKbbHbkWr1VAy4Ua7PwT7sM5NndNWAd7a84hxzB_levbAwR8n/exec");
        if (!response.ok) {
          throw new Error('Failed to fetch prayer times');
        }

        const data = await response.json();
        console.log('Fetched prayer time data:', data);
        
        if (data && data.data && Array.isArray(data.data)) {
          const today = new Date();
          const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
          
          // Find today's entry
          const todayEntry = data.data.find((entry: any) => entry.date === formattedDate || entry.Date === formattedDate);
          
          if (todayEntry) {
            // Format time function (convert from string like "05:15" to "5:15 am")
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
                time: formatTime(todayEntry.Fajr || "05:15"), 
                timestamp: getTimestamp(todayEntry.Fajr || "05:15"),
                icon: <Sunrise size={40} className="mb-2 text-amber-300" />,
                bgColor: 'bg-pink-50',
                textColor: 'text-pink-600'
              },
              { 
                name: 'Dhuhr', 
                time: formatTime(todayEntry.Zuhr || "12:15"), 
                timestamp: getTimestamp(todayEntry.Zuhr || "12:15"),
                icon: <Sun size={40} className="mb-2 text-yellow-400" />,
                bgColor: 'bg-amber-50',
                textColor: 'text-amber-600'
              },
              { 
                name: 'Asr (S)', 
                time: formatTime(todayEntry.Asr || "15:30"), 
                timestamp: getTimestamp(todayEntry.Asr || "15:30"),
                icon: <Sun size={40} className="mb-2 text-orange-300" />,
                bgColor: 'bg-green-50',
                textColor: 'text-green-600'
              },
              { 
                name: 'Asr (H)', 
                time: formatTime(todayEntry.Asr || "16:00"), 
                timestamp: getTimestamp(todayEntry.Asr || "16:00"),
                icon: <Sun size={40} className="mb-2 text-orange-300" />,
                bgColor: 'bg-teal-50',
                textColor: 'text-teal-600'
              },
              { 
                name: 'Maghrib', 
                time: formatTime(todayEntry.Maghrib || "17:45"), 
                timestamp: getTimestamp(todayEntry.Maghrib || "17:45"),
                icon: <Sunset size={40} className="mb-2 text-orange-500" />,
                bgColor: 'bg-red-50',
                textColor: 'text-red-600'
              },
              { 
                name: 'Isha', 
                time: formatTime(todayEntry.Isha || "19:15"), 
                timestamp: getTimestamp(todayEntry.Isha || "19:15"),
                icon: <Moon size={40} className="mb-2 text-blue-200" />,
                bgColor: 'bg-indigo-50',
                textColor: 'text-indigo-600'
              }
            ];
            
            setTodayPrayerTimes(prayerTimes);
            toast.success('Live prayer times loaded for today');
          } else {
            console.error('No data found for today in the API response');
            toast.error('Could not find today\'s prayer times');
            // Set fallback prayer times
            setupFallbackPrayerTimes();
          }
        } else {
          console.error('Invalid data format from API');
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

    // Fallback prayer times setup
    const setupFallbackPrayerTimes = () => {
      setTodayPrayerTimes([
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
