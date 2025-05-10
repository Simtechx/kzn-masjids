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
import LivePrayerTimes from '@/components/LivePrayerTimes';

const Index = () => {
  // Historic masjids data
  const historicMasjids = [
    {
      id: "grey-street",
      name: "Grey Street Juma Masjid",
      location: "Durban",
      region: "Durban", // Adding required 'region' property
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
    },
    {
      id: "west-street",
      name: "West Street Masjid",
      location: "Durban",
      region: "Durban", 
      year: "circa 1890s",
      info: "Early central Durban masjid, near the city's commercial hub.",
      image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80"
    },
    {
      id: "ottawa",
      name: "Ottawa Soofie Masjid",
      location: "Ottawa",
      region: "North Coast", 
      year: "circa late 1890s",
      info: "Another in the Soofie Saheb series, foundational in the Ottawa community.",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80"
    },
    {
      id: "tongaat",
      name: "Tongaat Soofie Masjid",
      location: "Tongaat",
      region: "North Coast", 
      year: "circa 1900",
      info: "Historic masjid in the northern KZN region, part of the Soofie mission.",
      image: "https://images.unsplash.com/photo-1560264234-b5618a0bfb0c?auto=format&fit=crop&q=80"
    },
    {
      id: "clairwood",
      name: "Clairwood Juma Masjid",
      location: "Clairwood",
      region: "South Coast", 
      year: "early 1900s",
      info: "Serves one of Durban's oldest Indian communities.",
      image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80"
    },
    {
      id: "pietermaritzburg",
      name: "Pietermaritzburg Juma Masjid",
      location: "Pietermaritzburg",
      region: "Midlands", 
      year: "circa 1890s–1900",
      info: "A longstanding central masjid in the capital city of KZN.",
      image: "https://images.unsplash.com/photo-1551038247-3d9af20df552?auto=format&fit=crop&q=80"
    },
    {
      id: "verulam",
      name: "Verulam Juma Masjid",
      location: "Verulam",
      region: "North Coast", 
      year: "circa early 1900s",
      info: "Landmark mosque in this major Indian settlement.",
      image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&q=80"
    },
    {
      id: "isipingo",
      name: "Isipingo Beach Masjid",
      location: "Isipingo Beach",
      region: "South Coast", 
      year: "circa early 1900s",
      info: "Key religious hub for the Muslim community in Isipingo.",
      image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Live Prayer Times moved to top immediately after navbar */}
      <LivePrayerTimes />
      
      {/* FindMasjidsHero added below LivePrayerTimes */}
      <FindMasjidsHero />
      
      <main>
        {/* PrayerTimeSearch without LivePrayerTimes at top */}
        <PrayerTimeSearch />
        
        {/* Historic Masjids Carousel */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-center text-3xl font-bold mb-2 text-teal-800">Historic Masjids</h2>
            <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
              Discover some of the most historic and significant masjids across KwaZulu-Natal.
            </p>
            
            <div className="carousel-container relative">
              {/* Historic masjids carousel with the properly formatted data */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {historicMasjids.slice(0, 3).map((masjid) => (
                  <FeaturedMasjid key={masjid.id} masjid={{
                    id: masjid.id,
                    name: masjid.name,
                    location: masjid.location,
                    region: masjid.region,
                    image: masjid.image,
                    description: `${masjid.info} (${masjid.year})`
                  }} />
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Notices Section */}
        <NoticesSection />
        
        {/* Audio Section - Keep at the bottom */}
        <MasjidAudio />
        
        {/* Counter Section moved to the bottom */}
        <CounterSection />
        
        {/* Support New Masjids - Moved to below counter section */}
        <SupportNewMasjids />
        
        {/* Hero component comes last above footer */}
        <Hero />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
