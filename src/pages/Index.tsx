
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NoticesSection from '@/components/NoticesSection';
import CounterSection from '@/components/CounterSection';
import LivePrayerTimes from '@/components/LivePrayerTimes';
import FindMasjidsHero from '@/components/FindMasjidsHero';
import NearbyMasjidsSlider from '@/components/NearbyMasjidsSlider';
import PrayerTimeFilter from '@/components/PrayerTimeFilter';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Live Salaah Times at top immediately after navbar */}
      <LivePrayerTimes />
      
      {/* Nearby Masjids Slider - New module between LivePrayerTimes and PrayerTimeFilter */}
      <NearbyMasjidsSlider />
      
      {/* Find Masjids Hero Section - Moved above PrayerTimeFilter */}
      <FindMasjidsHero />
      
      {/* Prayer Time Filter - New section with region selector and prayer time cards */}
      <PrayerTimeFilter />
      
      <main>
        {/* Counter Section - Between Find Masjid and Notices */}
        <CounterSection />
        
        {/* Notices Section - Last thing before footer */}
        <NoticesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
