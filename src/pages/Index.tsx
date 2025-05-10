
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import PrayerTimeSearch from '@/components/PrayerTimeSearch';
import SupportNewMasjids from '@/components/SupportNewMasjids';
import NoticesSection from '@/components/NoticesSection';
import MasjidAudio from '@/components/MasjidAudio';
import { featuredMasjids } from '@/data/mockData';
import FeaturedMasjid from '@/components/FeaturedMasjid';
import CounterSection from '@/components/CounterSection';
import FindMasjidsHero from '@/components/FindMasjidsHero';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        
        {/* Audio Section */}
        <MasjidAudio />

        {/* Notices Section - Redesigned as image slider */}
        <NoticesSection />

        {/* Find Masjids Hero - Placed between Prayer Times and Prayer Time Search */}
        <FindMasjidsHero />
        
        {/* Prayer Time Search */}
        <PrayerTimeSearch />

        {/* Featured Masjids */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-center text-3xl font-bold mb-2 text-teal-800">Featured Masjids</h2>
            <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
              Discover some of the most prominent and historic masjids across KwaZulu-Natal.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredMasjids.map((masjid) => (
                <FeaturedMasjid key={masjid.id} masjid={masjid} />
              ))}
            </div>
          </div>
        </section>

        {/* Support New Masjids */}
        <SupportNewMasjids />

        {/* Counter Section - Moved to the bottom above footer */}
        <CounterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
