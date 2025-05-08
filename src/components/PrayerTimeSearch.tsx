
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from '@/components/ui/table';

const prayerTimesData = {
  'Northern Natal': [
    { fajr: '05:17', dhuhr: '12:15', asr: '15:15', maghrib: '17:45', isha: '18:45', masjid: 'Masjid Al-Noor, Newcastle' },
    { fajr: '05:20', dhuhr: '12:20', asr: '15:45', maghrib: '17:48', isha: '18:50', masjid: 'Masjid Al-Rahman, Ladysmith' },
    { fajr: '05:25', dhuhr: '12:30', asr: '16:00', maghrib: '17:50', isha: '19:00', masjid: 'Juma Masjid, Dundee' },
  ],
  'South Coast': [
    { fajr: '05:30', dhuhr: '12:40', asr: '16:15', maghrib: '17:55', isha: '19:05', masjid: 'Masjid Al-Islam, Port Shepstone' },
    { fajr: '05:40', dhuhr: '12:45', asr: '16:30', maghrib: '18:00', isha: '19:10', masjid: 'Masjid Al-Furqaan, Margate' },
    { fajr: '05:45', dhuhr: '13:00', asr: '16:35', maghrib: '18:05', isha: '19:15', masjid: 'Masjid Al-Huda, Scottburgh' },
  ],
  'Durban': [
    { fajr: '05:50', dhuhr: '13:10', asr: '16:40', maghrib: '18:10', isha: '19:20', masjid: 'West Street Masjid, Durban CBD' },
    { fajr: '05:55', dhuhr: '13:15', asr: '16:45', maghrib: '18:15', isha: '19:25', masjid: 'Grey Street Masjid, Durban' },
    { fajr: '06:00', dhuhr: '13:20', asr: '16:45', maghrib: '18:20', isha: '19:30', masjid: 'Overport Masjid, Durban' },
  ],
  'Midlands': [
    { fajr: '06:05', dhuhr: '13:15', asr: '16:30', maghrib: '18:10', isha: '19:15', masjid: 'Northdale Masjid, Pietermaritzburg' },
    { fajr: '06:10', dhuhr: '13:20', asr: '16:35', maghrib: '18:15', isha: '19:20', masjid: 'Howick Masjid, Howick' },
    { fajr: '06:15', dhuhr: '13:25', asr: '16:40', maghrib: '18:20', isha: '19:25', masjid: 'Estcourt Masjid, Estcourt' },
  ],
  'North Coast': [
    { fajr: '05:45', dhuhr: '12:45', asr: '16:15', maghrib: '17:50', isha: '19:00', masjid: 'Masjid Al-Noor, Stanger' },
    { fajr: '05:50', dhuhr: '12:50', asr: '16:20', maghrib: '17:55', isha: '19:05', masjid: 'Ballito Masjid, Ballito' },
    { fajr: '05:55', dhuhr: '13:00', asr: '16:25', maghrib: '18:00', isha: '19:10', masjid: 'Tongaat Masjid, Tongaat' },
  ],
  'Transkei': [
    { fajr: '05:35', dhuhr: '12:30', asr: '16:10', maghrib: '17:45', isha: '18:55', masjid: 'Umtata Masjid, Mthatha' },
    { fajr: '05:40', dhuhr: '12:35', asr: '16:15', maghrib: '17:50', isha: '19:00', masjid: 'Butterworth Masjid, Butterworth' },
    { fajr: '05:45', dhuhr: '12:40', asr: '16:20', maghrib: '17:55', isha: '19:05', masjid: 'Port St Johns Masjid, Port St Johns' },
  ],
};

const PrayerTimeSearch = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [searchType, setSearchType] = useState<'earliest' | 'latest'>('earliest');
  const [searchQuery, setSearchQuery] = useState('');

  const handleRegionSelection = (region: string) => {
    setSelectedRegion(region);
  };

  const getFilteredPrayerTimes = () => {
    if (!selectedRegion) return [];
    
    const regionData = prayerTimesData[selectedRegion as keyof typeof prayerTimesData] || [];
    
    if (searchQuery) {
      return regionData.filter(masjid => 
        masjid.masjid.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return regionData;
  };

  const findExtremeTime = (prayer: 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha', type: 'earliest' | 'latest') => {
    if (!selectedRegion) return null;
    
    const prayerTimes = prayerTimesData[selectedRegion as keyof typeof prayerTimesData];
    if (!prayerTimes?.length) return null;
    
    // Convert time strings to comparable values (minutes since midnight)
    const timeValues = prayerTimes.map(item => {
      const [hours, minutes] = item[prayer].split(':').map(Number);
      return {
        value: hours * 60 + minutes,
        time: item[prayer],
        masjid: item.masjid
      };
    });
    
    // Find earliest or latest time
    if (type === 'earliest') {
      return timeValues.reduce((min, time) => time.value < min.value ? time : min, timeValues[0]);
    } else {
      return timeValues.reduce((max, time) => time.value > max.value ? time : max, timeValues[0]);
    }
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-center text-3xl font-bold mb-2 text-islamic-blue">Prayer Time Search</h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Find the earliest and latest prayer times across different masjids in KwaZulu-Natal regions.
        </p>
        
        <div className="flex flex-col space-y-6">
          {/* Region Selection */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {Object.keys(prayerTimesData).map((region) => (
              <Button
                key={region}
                variant={selectedRegion === region ? "default" : "outline"} 
                className={selectedRegion === region ? "bg-islamic-green text-white" : "text-gray-700"}
                onClick={() => handleRegionSelection(region)}
              >
                {region}
              </Button>
            ))}
          </div>
          
          {/* Search Bar */}
          {selectedRegion && (
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <Input 
                  placeholder="Search for masjid..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant={searchType === 'earliest' ? "default" : "outline"}
                  className={searchType === 'earliest' ? "bg-islamic-blue" : ""}
                  onClick={() => setSearchType('earliest')}
                >
                  Earliest Times
                </Button>
                <Button 
                  variant={searchType === 'latest' ? "default" : "outline"}
                  className={searchType === 'latest' ? "bg-islamic-blue" : ""}
                  onClick={() => setSearchType('latest')}
                >
                  Latest Times
                </Button>
              </div>
            </div>
          )}
          
          {/* Prayer Times Display */}
          {selectedRegion && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-islamic-blue">
                {searchType === 'earliest' ? 'Earliest' : 'Latest'} Prayer Times in {selectedRegion}
              </h3>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold">Prayer</TableHead>
                      <TableHead className="font-bold">Time</TableHead>
                      <TableHead className="font-bold">Masjid</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].map((prayer) => {
                      const extremeTime = findExtremeTime(prayer as any, searchType);
                      return (
                        <TableRow key={prayer} className={searchType === 'earliest' ? 
                          (prayer === 'fajr' ? 'bg-blue-50' : '') : 
                          (prayer === 'isha' ? 'bg-blue-50' : '')
                        }>
                          <TableCell className="font-medium capitalize">{prayer}</TableCell>
                          <TableCell>{extremeTime?.time}</TableCell>
                          <TableCell>{extremeTime?.masjid}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-4 text-islamic-green">All Masjids in {selectedRegion}</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {getFilteredPrayerTimes().map((masjid, index) => (
                    <div key={index} className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                      <h4 className="font-semibold text-lg mb-2">{masjid.masjid}</h4>
                      <div className="grid grid-cols-5 gap-1">
                        <div className="bg-islamic-cream p-2 rounded text-center">
                          <div className="text-xs font-medium">Fajr</div>
                          <div>{masjid.fajr}</div>
                        </div>
                        <div className="bg-islamic-cream p-2 rounded text-center">
                          <div className="text-xs font-medium">Dhuhr</div>
                          <div>{masjid.dhuhr}</div>
                        </div>
                        <div className="bg-islamic-cream p-2 rounded text-center">
                          <div className="text-xs font-medium">Asr</div>
                          <div>{masjid.asr}</div>
                        </div>
                        <div className="bg-islamic-cream p-2 rounded text-center">
                          <div className="text-xs font-medium">Maghrib</div>
                          <div>{masjid.maghrib}</div>
                        </div>
                        <div className="bg-islamic-cream p-2 rounded text-center">
                          <div className="text-xs font-medium">Isha</div>
                          <div>{masjid.isha}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PrayerTimeSearch;
