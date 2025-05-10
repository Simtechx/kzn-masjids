
import React from 'react';
import { MasjidData, PrayerType } from '@/utils/prayerTimeUtils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

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
  // Exclude maghrib as per requirements
  const prayerTypes: PrayerType[] = ['fajr', 'dhuhr', 'asr', 'isha'];

  const renderTableView = () => {
    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-islamic-green text-white">
              <TableHead className="font-bold">Masjid</TableHead>
              <TableHead className="font-bold">Address</TableHead>
              <TableHead className="font-bold">Fajr</TableHead>
              <TableHead className="font-bold">Dhuhr</TableHead>
              <TableHead className="font-bold">Asr</TableHead>
              <TableHead className="font-bold">Isha</TableHead>
              <TableHead className="font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPrayerTimes.map((masjid, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{masjid.masjid}</TableCell>
                <TableCell>123 Example St, {selectedRegion}</TableCell>
                {prayerTypes.map(prayer => (
                  <TableCell 
                    key={prayer} 
                    className={
                      activePrayer === prayer && masjid[prayer] === selectedTime 
                        ? 'bg-islamic-green text-white font-bold' 
                        : ''
                    }
                  >
                    {masjid[prayer]}
                  </TableCell>
                ))}
                <TableCell>
                  <Button variant="outline" size="sm">View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  const renderBlockView = () => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {filteredPrayerTimes.map((masjid, index) => (
          <div key={index} className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
            <h4 className="font-semibold text-lg mb-2 text-islamic-green">{masjid.masjid}</h4>
            <p className="text-gray-600 text-sm mb-3">123 Example St, {selectedRegion}</p>
            <div className="grid grid-cols-4 gap-1">
              {prayerTypes.map((prayer) => (
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
            <div className="mt-3 text-right">
              <Button variant="outline" size="sm">View Details</Button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-4 text-islamic-green">
        {`All Masjids in ${selectedRegion}`}
      </h3>
      {viewMode === 'table' ? renderTableView() : renderBlockView()}
    </div>
  );
};

export default MasjidsList;
