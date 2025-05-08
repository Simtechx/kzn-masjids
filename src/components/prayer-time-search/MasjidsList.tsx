
import React from 'react';
import { MasjidData, PrayerType } from '@/utils/prayerTimeUtils';

interface MasjidsListProps {
  selectedRegion: string;
  activePrayer: PrayerType | null;
  selectedTime: string | null;
  filteredPrayerTimes: MasjidData[];
}

const MasjidsList: React.FC<MasjidsListProps> = ({
  selectedRegion,
  activePrayer,
  selectedTime,
  filteredPrayerTimes
}) => {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-4 text-islamic-green">
        {`All Masjids in ${selectedRegion}`}
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {filteredPrayerTimes.map((masjid, index) => (
          <div key={index} className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
            <h4 className="font-semibold text-lg mb-2">{masjid.masjid}</h4>
            <div className="grid grid-cols-5 gap-1">
              {['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].map((prayer) => (
                <div 
                  key={prayer}
                  className={`p-2 rounded text-center ${
                    activePrayer === prayer && masjid[prayer as PrayerType] === selectedTime 
                      ? 'bg-islamic-green text-white' 
                      : 'bg-islamic-cream'
                  }`}
                >
                  <div className="text-xs font-medium">{prayer.charAt(0).toUpperCase() + prayer.slice(1)}</div>
                  <div>{masjid[prayer as PrayerType]}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasjidsList;
