
// Extended data structure with specific times for filtering
export const prayerTimesData = {
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

export type PrayerType = 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';
export type SearchType = 'earliest' | 'latest';
export type MasjidData = { fajr: string; dhuhr: string; asr: string; maghrib: string; isha: string; masjid: string };

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
