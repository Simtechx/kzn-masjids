
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

// Extended data structure with specific times for filtering
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

// Get all unique times for a specific prayer type across all regions
const getUniquePrayerTimes = (prayerType) => {
  const allTimes = [];
  Object.values(prayerTimesData).forEach(region => {
    region.forEach(masjid => {
      if (!allTimes.includes(masjid[prayerType])) {
        allTimes.push(masjid[prayerType]);
      }
    });
  });
  return allTimes.sort();
};

// Generate time blocks for filtering
const generateTimeBlocks = (prayerType) => {
  const times = getUniquePrayerTimes(prayerType);
  const earliestTime = times[0];
  const latestTime = times[times.length - 1];
  
  return { times, earliestTime, latestTime };
};

const PrayerTimeSearch = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [searchType, setSearchType] = useState<'earliest' | 'latest'>('earliest');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePrayer, setActivePrayer] = useState<'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha' | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  const prayerInfo = {
    fajr: { label: 'Fajr', arabicLabel: 'Subh Saadiq' },
    dhuhr: { label: 'Dhuhr', arabicLabel: 'Zawaal' },
    asr: { label: 'Asr', arabicLabel: 'Asr' },
    maghrib: { label: 'Maghrib', arabicLabel: 'Maghrib' },
    isha: { label: 'Isha', arabicLabel: 'Isha' },
  };

  const handleRegionSelection = (region: string) => {
    setSelectedRegion(region);
    setActivePrayer(null);
    setSelectedTime(null);
  };

  const handlePrayerSelection = (prayer: 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha') => {
    setActivePrayer(activePrayer === prayer ? null : prayer);
    setSelectedTime(null);
  };

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
  };

  const getFilteredPrayerTimes = () => {
    if (!selectedRegion) return [];
    
    const regionData = prayerTimesData[selectedRegion as keyof typeof prayerTimesData] || [];
    
    let filteredData = [...regionData];
    
    // Filter by search query (masjid name)
    if (searchQuery) {
      filteredData = filteredData.filter(masjid => 
        masjid.masjid.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by selected prayer time
    if (activePrayer && selectedTime) {
      filteredData = filteredData.filter(masjid => 
        masjid[activePrayer] === selectedTime
      );
    }
    
    return filteredData;
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
          Find prayer times across different masjids in KwaZulu-Natal regions by selecting specific times.
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
          
          {/* Prayer Time Blocks */}
          {selectedRegion && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 mb-4">
                <div 
                  className={`p-3 rounded cursor-pointer text-center ${activePrayer === 'fajr' ? 'bg-islamic-blue text-white' : 'bg-white hover:bg-gray-50'}`}
                  onClick={() => handlePrayerSelection('fajr')}
                >
                  <div className="font-medium">Subh Saadiq - Fajr</div>
                  <div>{findExtremeTime('fajr', 'earliest')?.time}</div>
                </div>
                <div 
                  className={`p-3 rounded cursor-pointer text-center ${activePrayer === 'dhuhr' ? 'bg-islamic-blue text-white' : 'bg-white hover:bg-gray-50'}`}
                  onClick={() => handlePrayerSelection('dhuhr')}
                >
                  <div className="font-medium">Zawaal - Dhuhr</div>
                  <div>{findExtremeTime('dhuhr', 'earliest')?.time}</div>
                </div>
                <div 
                  className={`p-3 rounded cursor-pointer text-center ${activePrayer === 'asr' ? 'bg-islamic-blue text-white' : 'bg-white hover:bg-gray-50'}`}
                  onClick={() => handlePrayerSelection('asr')}
                >
                  <div className="font-medium">Asr</div>
                  <div>{findExtremeTime('asr', 'earliest')?.time}</div>
                </div>
                <div 
                  className={`p-3 rounded cursor-pointer text-center ${activePrayer === 'maghrib' ? 'bg-islamic-blue text-white' : 'bg-white hover:bg-gray-50'}`}
                  onClick={() => handlePrayerSelection('maghrib')}
                >
                  <div className="font-medium">Maghrib</div>
                  <div>{findExtremeTime('maghrib', 'earliest')?.time}</div>
                </div>
                <div 
                  className={`p-3 rounded cursor-pointer text-center ${activePrayer === 'isha' ? 'bg-islamic-blue text-white' : 'bg-white hover:bg-gray-50'}`}
                  onClick={() => handlePrayerSelection('isha')}
                >
                  <div className="font-medium">Isha</div>
                  <div>{findExtremeTime('isha', 'earliest')?.time}</div>
                </div>
              </div>

              {/* Instructions message */}
              <div className="bg-gray-200 p-3 mb-4 rounded text-center text-gray-700">
                Click the blocks above to filter the times.
              </div>

              {/* Prayer Time Filter Options */}
              {activePrayer && (
                <div className="mb-6">
                  <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 gap-2">
                    <div className={`p-2 bg-blue-100 rounded text-center`}>
                      <div className="text-xs font-medium">EARLIEST {activePrayer.toUpperCase()}</div>
                      <div>{findExtremeTime(activePrayer, 'earliest')?.time}</div>
                    </div>
                    
                    {getUniquePrayerTimes(activePrayer).map((time, index) => {
                      const isEarliest = time === findExtremeTime(activePrayer, 'earliest')?.time;
                      const isLatest = time === findExtremeTime(activePrayer, 'latest')?.time;
                      
                      return (
                        <div 
                          key={index}
                          className={`p-2 rounded text-center cursor-pointer 
                            ${selectedTime === time ? 'bg-islamic-green text-white' : 
                              (isEarliest || isLatest) ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'}`}
                          onClick={() => handleTimeSelection(time)}
                        >
                          <div>{time}</div>
                          {isLatest && <div className="text-xs mt-1">LATEST {activePrayer.toUpperCase()}</div>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
          
              {/* Search Bar */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
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
              
              {/* Prayer Times Display */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-islamic-blue">
                  {selectedTime && activePrayer 
                    ? `Masjids with ${activePrayer.charAt(0).toUpperCase() + activePrayer.slice(1)} at ${selectedTime}` 
                    : `${searchType === 'earliest' ? 'Earliest' : 'Latest'} Prayer Times in ${selectedRegion}`}
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
                      {!selectedTime ? (
                        ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].map((prayer) => {
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
                        })
                      ) : (
                        getFilteredPrayerTimes().map((masjid, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-medium capitalize">{activePrayer}</TableCell>
                            <TableCell>{masjid[activePrayer as keyof typeof masjid]}</TableCell>
                            <TableCell>{masjid.masjid}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-4 text-islamic-green">
                    {selectedTime && activePrayer 
                      ? `All Masjids in ${selectedRegion}` 
                      : `All Masjids in ${selectedRegion}`}
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {getFilteredPrayerTimes().map((masjid, index) => (
                      <div key={index} className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                        <h4 className="font-semibold text-lg mb-2">{masjid.masjid}</h4>
                        <div className="grid grid-cols-5 gap-1">
                          <div className={`p-2 rounded text-center ${activePrayer === 'fajr' && masjid.fajr === selectedTime ? 'bg-islamic-green text-white' : 'bg-islamic-cream'}`}>
                            <div className="text-xs font-medium">Fajr</div>
                            <div>{masjid.fajr}</div>
                          </div>
                          <div className={`p-2 rounded text-center ${activePrayer === 'dhuhr' && masjid.dhuhr === selectedTime ? 'bg-islamic-green text-white' : 'bg-islamic-cream'}`}>
                            <div className="text-xs font-medium">Dhuhr</div>
                            <div>{masjid.dhuhr}</div>
                          </div>
                          <div className={`p-2 rounded text-center ${activePrayer === 'asr' && masjid.asr === selectedTime ? 'bg-islamic-green text-white' : 'bg-islamic-cream'}`}>
                            <div className="text-xs font-medium">Asr</div>
                            <div>{masjid.asr}</div>
                          </div>
                          <div className={`p-2 rounded text-center ${activePrayer === 'maghrib' && masjid.maghrib === selectedTime ? 'bg-islamic-green text-white' : 'bg-islamic-cream'}`}>
                            <div className="text-xs font-medium">Maghrib</div>
                            <div>{masjid.maghrib}</div>
                          </div>
                          <div className={`p-2 rounded text-center ${activePrayer === 'isha' && masjid.isha === selectedTime ? 'bg-islamic-green text-white' : 'bg-islamic-cream'}`}>
                            <div className="text-xs font-medium">Isha</div>
                            <div>{masjid.isha}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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
