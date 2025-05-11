
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const FindMasjidsHero: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <section className="py-10 md:py-16 px-4 bg-[#072c23] text-white">
      <div className="container mx-auto text-center">
        <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold mb-4 leading-tight`}>
          Find Masjids & Musallahs in KwaZulu-Natal
        </h2>
        <p className="text-lg md:text-xl max-w-4xl mx-auto">
          Discover prayer spaces across KZN's 5 regions - Northern Natal, South Coast, Durban,
          Midlands, North Coast.
        </p>
      </div>
    </section>
  );
};

export default FindMasjidsHero;
