
import React from 'react';
import { MasjidData, PrayerType } from '@/utils/prayerTimeUtils';
import MasjidsTableView from './MasjidsTableView';
import MasjidsBlockView from './MasjidsBlockView';

interface MasjidsListProps {
  selectedRegion: string;
  activePrayer: PrayerType | null;
  selectedTime: string | null;
  filteredPrayerTimes: MasjidData[];
  viewMode: 'block' | 'table';
}

const MasjidsList: React.FC<MasjidsListProps> = ({
  selectedRegion,
  activePrayer,
  selectedTime,
  filteredPrayerTimes,
  viewMode
}) => {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-4 text-teal-700">
        {`All Masjids in ${selectedRegion}`}
      </h3>
      
      {viewMode === 'table' ? (
        <MasjidsTableView
          selectedRegion={selectedRegion}
          activePrayer={activePrayer}
          selectedTime={selectedTime}
          filteredPrayerTimes={filteredPrayerTimes}
        />
      ) : (
        <MasjidsBlockView
          selectedRegion={selectedRegion}
          activePrayer={activePrayer}
          selectedTime={selectedTime}
          filteredPrayerTimes={filteredPrayerTimes}
        />
      )}
    </div>
  );
};

export default MasjidsList;
