// Extended data structure with specific times for filtering
export const prayerTimesData = {
  'Northern Natal': [
    { fajr: '05:17', dhuhr: '12:15', asr: '15:15', maghrib: '17:45', isha: '18:45', masjid: 'Masjid Al-Noor, Newcastle', address: '123 Main Road, Newcastle' },
    { fajr: '05:20', dhuhr: '12:20', asr: '15:45', maghrib: '17:48', isha: '18:50', masjid: 'Masjid Al-Rahman, Ladysmith', address: '45 Victoria Street, Ladysmith' },
    { fajr: '05:25', dhuhr: '12:30', asr: '16:00', maghrib: '17:50', isha: '19:00', masjid: 'Juma Masjid, Dundee', address: '78 Smith Avenue, Dundee' },
  ],
  'South Coast': [
    { fajr: '05:30', dhuhr: '12:40', asr: '16:15', maghrib: '17:55', isha: '19:05', masjid: 'Masjid Al-Islam, Port Shepstone', address: '12 Beach Road, Port Shepstone' },
    { fajr: '05:40', dhuhr: '12:45', asr: '16:30', maghrib: '18:00', isha: '19:10', masjid: 'Masjid Al-Furqaan, Margate', address: '35 Marine Drive, Margate' },
    { fajr: '05:45', dhuhr: '13:00', asr: '16:35', maghrib: '18:05', isha: '19:15', masjid: 'Masjid Al-Huda, Scottburgh', address: '67 Scott Street, Scottburgh' },
    { fajr: '05:35', dhuhr: '12:30', asr: '16:10', maghrib: '17:45', isha: '18:55', masjid: 'Umtata Masjid, Transkei', address: '23 Union Avenue, Mthatha' },
    { fajr: '05:40', dhuhr: '12:35', asr: '16:15', maghrib: '17:50', isha: '19:00', masjid: 'Butterworth Masjid, Transkei', address: '9 Main Road, Butterworth' },
  ],
  'Durban': [
    { fajr: '05:50', dhuhr: '13:10', asr: '16:40', maghrib: '18:10', isha: '19:20', masjid: 'West Street Masjid, Durban CBD', address: '123 West Street, Durban' },
    { fajr: '05:55', dhuhr: '13:15', asr: '16:45', maghrib: '18:15', isha: '19:25', masjid: 'Grey Street Masjid, Durban', address: '56 Grey Street, Durban' },
    { fajr: '06:00', dhuhr: '13:20', asr: '16:45', maghrib: '18:20', isha: '19:30', masjid: 'Overport Masjid, Durban', address: '78 Overport Drive, Durban' },
  ],
  'Midlands': [
    { fajr: '06:05', dhuhr: '13:15', asr: '16:30', maghrib: '18:10', isha: '19:15', masjid: 'Northdale Masjid, Pietermaritzburg', address: '45 Northern Road, Pietermaritzburg' },
    { fajr: '06:10', dhuhr: '13:20', asr: '16:35', maghrib: '18:15', isha: '19:20', masjid: 'Howick Masjid, Howick', address: '12 Main Street, Howick' },
    { fajr: '06:15', dhuhr: '13:25', asr: '16:40', maghrib: '18:20', isha: '19:25', masjid: 'Estcourt Masjid, Estcourt', address: '89 Central Avenue, Estcourt' },
  ],
  'North Coast': [
    { fajr: '05:45', dhuhr: '12:45', asr: '16:15', maghrib: '17:50', isha: '19:00', masjid: 'Masjid Al-Noor, Stanger', address: '23 King Street, Stanger' },
    { fajr: '05:50', dhuhr: '12:50', asr: '16:20', maghrib: '17:55', isha: '19:05', masjid: 'Ballito Masjid, Ballito', address: '45 Beach Road, Ballito' },
    { fajr: '05:55', dhuhr: '13:00', asr: '16:25', maghrib: '18:00', isha: '19:10', masjid: 'Tongaat Masjid, Tongaat', address: '67 Main Road, Tongaat' },
  ],
  // Keeping Transkei as a key for backward compatibility, but not showing it in the UI
  'Transkei': [
    { fajr: '05:35', dhuhr: '12:30', asr: '16:10', maghrib: '17:45', isha: '18:55', masjid: 'Umtata Masjid, Mthatha', address: '23 Union Avenue, Mthatha' },
    { fajr: '05:40', dhuhr: '12:35', asr: '16:15', maghrib: '17:50', isha: '19:00', masjid: 'Butterworth Masjid, Butterworth', address: '9 Main Road, Butterworth' },
    { fajr: '05:45', dhuhr: '12:40', asr: '16:20', maghrib: '17:55', isha: '19:05', masjid: 'Port St Johns Masjid, Port St Johns', address: '34 Coast Road, Port St Johns' },
  ],
};

export type PrayerType = 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';
export type SearchType = 'earliest' | 'latest';
export type MasjidData = { 
  fajr: string; 
  dhuhr: string; 
  asr: string; 
  maghrib: string; 
  isha: string; 
  masjid: string;
  address?: string;
};

// Updated subregion data to reflect the five main regions with Transkei as a sub-region
export const subRegionsData = {
  'Northern Natal': ['Newcastle', 'Ladysmith', 'Dundee', 'Vryheid', 'Utrecht'],
  'South Coast': ['Port Shepstone', 'Margate', 'Scottburgh', 'Umkomaas'],
  'Durban': ['North', 'South', 'City', 'Overport', 'Suburbs'],
  'Midlands': ['Pietermaritzburg', 'Richmond', 'Howick', 'Other'],
  'North Coast': ['Stanger', 'Ballito', 'Tongaat', 'Verulam']
};

// Get all unique times for a specific prayer type across all regions
export const getUniquePrayerTimes = (prayerType: PrayerType): string[] => {
  const allTimes: string[] = [];
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
export const generateTimeBlocks = (prayerType: PrayerType) => {
  const times = getUniquePrayerTimes(prayerType);
  const earliestTime = times[0];
  const latestTime = times[times.length - 1];
  
  return { times, earliestTime, latestTime };
};

export const prayerInfo = {
  fajr: { label: 'Fajr', arabicLabel: 'Subh Saadiq' },
  dhuhr: { label: 'Dhuhr', arabicLabel: 'Zawaal' },
  asr: { label: 'Asr', arabicLabel: 'Asr' },
  maghrib: { label: 'Maghrib', arabicLabel: 'Maghrib' },
  isha: { label: 'Isha', arabicLabel: 'Isha' },
};

export const findExtremeTime = (
  prayer: PrayerType,
  type: SearchType,
  selectedRegion: string | null
) => {
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
