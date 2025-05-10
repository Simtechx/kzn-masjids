
import React from 'react';
import { PrayerType } from '@/utils/prayerTimeUtils';
import PrayerTimeBlocks from './PrayerTimeBlocks';
import TimeSelectionGrid from './TimeSelectionGrid';

interface PrayerTimeSelectionProps {
  selectedRegion: string;
  activePrayer: PrayerType | null;
  selectedTime: string | null;
  onSelectPrayer: (prayer: PrayerType) => void;
  onSelectTime: (time: string) => void;
}

const PrayerTimeSelection: React.FC<PrayerTimeSelectionProps> = ({
  selectedRegion,
  activePrayer,
  selectedTime,
  onSelectPrayer,
  onSelectTime
}) => {
  return (
    <div>
      <PrayerTimeBlocks
        selectedRegion={selectedRegion}
        activePrayer={activePrayer}
        onSelectPrayer={onSelectPrayer}
      />

      {/* Instructions message */}
      <div className="bg-gray-200 p-3 mb-4 rounded text-center text-gray-700">
        Click the blocks above to filter the times.
      </div>

      {/* Prayer Time Filter Options */}
      {activePrayer && (
        <TimeSelectionGrid
          activePrayer={activePrayer}
          selectedRegion={selectedRegion}
          selectedTime={selectedTime}
          onSelectTime={onSelectTime}
        />
      )}
    </div>
  );
};

export default PrayerTimeSelection;
