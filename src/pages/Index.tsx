
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import PrayerTimeSearch from '@/components/PrayerTimeSearch';
import SupportNewMasjids from '@/components/SupportNewMasjids';
import NoticesSection from '@/components/NoticesSection';
import MasjidAudio from '@/components/MasjidAudio';
import FeaturedMasjid from '@/components/FeaturedMasjid';
import CounterSection from '@/components/CounterSection';
import LivePrayerTimes from '@/components/LivePrayerTimes';

const Index = () => {
  // Historic masjids data
  const historicMasjids = [
    {
      id: "grey-street",
      name: "Grey Street Juma Masjid",
      location: "Durban",
      region: "Durban",
      year: "1881",
      info: "Oldest and largest mosque in the southern hemisphere at the time of establishment.",
      image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80"
    },
    {
      id: "riverside",
      name: "Riverside Soofie Masjid",
      location: "Durban North",
      region: "North Coast", 
      year: "1895",
      info: "Established by Hazrath Soofie Saheb; part of the Soofie Saheb legacy.",
      image: "https://images.unsplash.com/photo-1551038247-3d9af20df552?auto=format&fit=crop&q=80"
    },
    {
      id: "ladysmith",
      name: "Ladysmith Soofie Masjid",
      location: "Ladysmith",
      region: "Northern Natal", 
      year: "1898",
      info: "Original wooden structure built by Soofie Saheb; rebuilt in 1969 with Moghul architecture.",
      image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Live Prayer Times at top immediately after navbar */}
      <LivePrayerTimes />
      
      <main>
        {/* PrayerTimeSearch */}
        <PrayerTimeSearch />
        
        {/* Historic Masjids Carousel */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-center text-3xl font-bold mb-2 text-teal-800">Historic Masjids</h2>
            <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
              Discover some of the most historic and significant masjids across KwaZulu-Natal.
            </p>
            
            <div className="carousel-container relative">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {historicMasjids.map((masjid) => (
                  <FeaturedMasjid key={masjid.id} masjid={{
                    id: masjid.id,
                    name: masjid.name,
                    location: masjid.location,
                    region: masjid.region,
                    image: masjid.image
                  }} />
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Notices Section */}
        <NoticesSection />
        
        {/* Audio Section */}
        <MasjidAudio />
        
        {/* Counter Section moved to the bottom */}
        <CounterSection />
        
        {/* Support New Masjids - below counter section */}
        <SupportNewMasjids />
        
        {/* Hero component comes last above footer */}
        <Hero />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
