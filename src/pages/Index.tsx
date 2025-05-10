
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

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <PrayerTimeSearch />

        {/* Notices Section - Redesigned as image slider */}
        <NoticesSection />
        
        {/* Audio Section */}
        <MasjidAudio />

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

        {/* Counter Section - Enhanced with watermark */}
        <CounterSection />

        {/* Call to Action */}
        <section className="py-16 px-4 bg-islamic-pattern">
          <div className="bg-teal-800/90 py-16">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4 text-white">Want to add a masjid or update information?</h2>
              <p className="text-white/90 mb-8 max-w-xl mx-auto">
                Help us make this directory more comprehensive by contributing information 
                about masjids or musallahs in your area.
              </p>
              <button className="bg-amber-500 hover:bg-amber-600 text-black font-medium py-3 px-8 rounded-md text-lg">
                Contribute Information
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
