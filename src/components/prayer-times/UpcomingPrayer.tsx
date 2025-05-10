
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { MapPin } from 'lucide-react';
import { PrayerTime } from '@/components/prayer-times/types';

interface UpcomingPrayerProps {
  upcomingPrayer: PrayerTime | null;
  currentLocation: string;
  timeRemaining: string;
  remainingPercentage: number;
}

const UpcomingPrayer: React.FC<UpcomingPrayerProps> = ({
  upcomingPrayer,
  currentLocation,
  timeRemaining,
  remainingPercentage
}) => {
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
      <div className="absolute inset-0 bg-black/70"></div>
      
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
  );
};

export default UpcomingPrayer;
