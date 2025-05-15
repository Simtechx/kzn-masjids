
import React from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from '@/components/ui/table';
import { 
  PrayerType, 
  SearchType, 
  MasjidData,
} from '@/utils/prayerTimeUtils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import MasjidsList from './MasjidsList';

interface PrayerTimesDisplayProps {
  selectedRegion: string;
  selectedSubRegion: string | null;
  selectedTime: string | null;
  activePrayer: PrayerType | null;
  searchType: SearchType;
  filteredPrayerTimes: MasjidData[];
  viewMode: 'block' | 'table';
}

const PrayerTimesDisplay: React.FC<PrayerTimesDisplayProps> = ({
  selectedRegion,
  selectedSubRegion,
  selectedTime,
  activePrayer,
  searchType,
  filteredPrayerTimes,
  viewMode
}) => {
  const isMobile = useIsMobile();
  
  // Get prayer types excluding maghrib
  const prayerTypes: PrayerType[] = ['fajr', 'dhuhr', 'asr', 'isha'];
  
  // Define prayer block colors
  const prayerColors = {
    fajr: 'bg-pink-50',
    dhuhr: 'bg-amber-50',
    asr: 'bg-teal-50',
    isha: 'bg-indigo-50',
  };
  
  const prayerTextColors = {
    fajr: 'text-pink-600',
    dhuhr: 'text-amber-600',
    asr: 'text-teal-600',
    isha: 'text-indigo-600',
  };

  // Generate the header title text
  const getHeaderTitle = () => {
    if (selectedTime && activePrayer) {
      return `Masjids with ${activePrayer.charAt(0).toUpperCase() + activePrayer.slice(1)} at ${selectedTime}`;
    } else if (selectedSubRegion) {
      return `Salaah Times in ${selectedSubRegion}`;
    } else {
      return `Salaah Times in ${selectedRegion}`;
    }
  };

  return (
    <MasjidsList
      selectedRegion={selectedRegion}
      activePrayer={activePrayer}
      selectedTime={selectedTime}
      filteredPrayerTimes={filteredPrayerTimes}
      viewMode={viewMode}
    />
  );
};

export default PrayerTimesDisplay;
