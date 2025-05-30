
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PrayerTimeSearch from '@/components/PrayerTimeSearch';
import NoticesSection from '@/components/NoticesSection';
import CounterSection from '@/components/CounterSection';
import LivePrayerTimes from '@/components/LivePrayerTimes';
import FindMasjidsHero from '@/components/FindMasjidsHero';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Live Salaah Times at top immediately after navbar */}
      <LivePrayerTimes />
      
      {/* Find Masjids Hero Section - Placed at the top only */}
      <FindMasjidsHero />
      
      <main>
        {/* SalaahTimeSearch */}
        <PrayerTimeSearch />
        
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
