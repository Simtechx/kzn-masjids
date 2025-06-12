
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { PrayerTime } from './types';

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
  const isMobile = useIsMobile();

  // Handle case when upcomingPrayer is null
  if (!upcomingPrayer) {
    return (
      <div 
        className="relative bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/lovable-uploads/313997ac-0790-47fa-a6e0-f866759aeeaa.png')`
        }}
      >
        <div className="p-6 text-white">
          <div className="flex items-center mb-4">
            <Clock className="h-6 w-6 mr-2 text-yellow-400" />
            <h3 className="text-xl font-bold">Next Salaah</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-gray-300 text-sm">{currentLocation}</p>
            </div>
            
            <div className="text-center">
              <p className="text-yellow-400 font-semibold text-lg">Loading prayer times...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/lovable-uploads/313997ac-0790-47fa-a6e0-f866759aeeaa.png')`
      }}
    >
      <div className="p-6 text-white">
        <div className="flex items-center mb-4">
          <Clock className="h-6 w-6 mr-2 text-yellow-400" />
          <h3 className="text-xl font-bold">Next Salaah</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <p className="text-gray-300 text-sm">{currentLocation}</p>
          </div>
          
          {/* Time remaining and upcoming prayer info */}
          <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center justify-between'}`}>
            {/* Time away text (only for web view) */}
            {!isMobile && (
              <div className="text-yellow-400 font-semibold text-lg">
                {timeRemaining}
              </div>
            )}
            
            <div className={`flex items-center ${isMobile ? 'justify-center' : 'space-x-3'}`}>
              <Badge 
                variant="secondary" 
                className="bg-yellow-500 text-black font-bold text-lg px-4 py-2"
              >
                {upcomingPrayer.name.toUpperCase()}
              </Badge>
              
              <div className="text-2xl font-bold text-white">
                {upcomingPrayer.time}
              </div>
            </div>
          </div>

          {/* Mobile time remaining */}
          {isMobile && (
            <div className="text-center">
              <p className="text-yellow-400 font-semibold text-lg">
                {timeRemaining}
              </p>
            </div>
          )}
          
          {/* Progress bar */}
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-yellow-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${100 - remainingPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingPrayer;
