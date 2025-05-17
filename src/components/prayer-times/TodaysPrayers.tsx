
import React, { useState } from 'react';
import { PrayerTime } from '@/components/prayer-times/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import PrayerTimeSettings from './PrayerTimeSettings';

interface TodaysPrayersProps {
  todayPrayerTimes: PrayerTime[];
}

const TodaysPrayers: React.FC<TodaysPrayersProps> = ({ todayPrayerTimes }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  // Reorder prayers to put Asr (S) before Asr (H)
  const reorderedPrayers = [...todayPrayerTimes].sort((a, b) => {
    // Special case for Asr prayers - swap their order
    if (a.name === 'Asr (S)' && b.name === 'Asr (H)') {
      return -1;
    }
    if (a.name === 'Asr (H)' && b.name === 'Asr (S)') {
      return 1;
    }
    
    // Default ordering for other prayers
    return todayPrayerTimes.indexOf(a) - todayPrayerTimes.indexOf(b);
  });
  
  // Get the current time
  const now = new Date().getTime();
  
  // Find the upcoming prayer - the next prayer after current time
  const upcomingPrayer = todayPrayerTimes.find(p => p.timestamp > now)?.name || '';
  
  // Function to determine background and text color based on prayer name
  const getPrayerColors = (prayerName: string, isUpcoming: boolean) => {
    // If this is the upcoming prayer, use darker shade of same color with white text
    if (isUpcoming) {
      if (prayerName === 'Fajr') {
        return { bgColor: 'bg-pink-600', textColor: 'text-white' };
      } else if (prayerName === 'Dhuhr') {
        return { bgColor: 'bg-amber-600', textColor: 'text-white' };
      } else if (prayerName === 'Asr (S)') {
        return { bgColor: 'bg-green-600', textColor: 'text-white' };
      } else if (prayerName === 'Asr (H)') {
        return { bgColor: 'bg-teal-600', textColor: 'text-white' };
      } else if (prayerName === 'Maghrib') {
        return { bgColor: 'bg-red-600', textColor: 'text-white' };
      } else if (prayerName === 'Isha') {
        return { bgColor: 'bg-indigo-600', textColor: 'text-white' };
      }
    }
    
    // For non-upcoming prayers, use the original light colors
    if (prayerName === 'Fajr') {
      return { bgColor: 'bg-pink-50', textColor: 'text-pink-600' };
    } else if (prayerName === 'Dhuhr') {
      return { bgColor: 'bg-amber-50', textColor: 'text-amber-600' };
    } else if (prayerName === 'Asr (S)') {
      return { bgColor: 'bg-green-50', textColor: 'text-green-600' };
    } else if (prayerName === 'Asr (H)') {
      return { bgColor: 'bg-teal-100', textColor: 'text-teal-800' };
    } else if (prayerName === 'Maghrib') {
      return { bgColor: 'bg-red-50', textColor: 'text-red-600' };
    } else if (prayerName === 'Isha') {
      return { bgColor: 'bg-indigo-50', textColor: 'text-indigo-600' };
    }
    
    return { bgColor: 'bg-gray-50', textColor: 'text-gray-600' };
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-xl font-medium text-gray-800 mb-4 text-center">Today's Salaah Times</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {reorderedPrayers.map((prayer, index) => {
          const isUpcoming = prayer.name === upcomingPrayer;
          // Get custom colors for prayers
          const { bgColor, textColor } = getPrayerColors(prayer.name, isUpcoming);
            
          return (
            <div key={index} className={`${bgColor} rounded-lg p-4 relative overflow-hidden shadow-sm`}>
              {/* Prayer name now at top left */}
              <div className={`${textColor} font-medium mb-1`}>{prayer.name}</div>
              
              {/* Time is now on left side */}
              <div className={`${textColor} text-2xl font-semibold`}>{prayer.time}</div>
              
              {/* UPCOMING badge on right top */}
              {isUpcoming && (
                <div className="absolute top-0 right-0">
                  <Badge className="bg-yellow-500 text-black rounded-bl-md font-semibold">
                    UPCOMING
                  </Badge>
                </div>
              )}
            </div>
          );
        })}
        
        <div className="col-span-2 mt-2">
          <div className="text-sm text-gray-500">Calculation Method: Umm Al-Qura</div>
          <div className="text-sm text-gray-500">Juristic Method: Hanafi</div>
          <Button 
            variant="link" 
            onClick={() => setSettingsOpen(true)} 
            className="text-[#072c23] text-sm mt-2 font-medium p-0 hover:underline flex items-center"
          >
            <Settings className="h-4 w-4 mr-1" />
            Change Settings
          </Button>
        </div>
      </div>

      {/* Prayer Settings Dialog */}
      <PrayerTimeSettings 
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        onSettingsChange={(settings) => {
          console.log('Prayer settings updated:', settings);
          // Here you would update the prayer times with these settings
          // This would typically involve updating a context or making an API call
        }}
      />
    </div>
  );
};

export default TodaysPrayers;
