
import React from 'react';
import MasjidCarousel from './masjid-projects/MasjidCarousel';
import { useIsMobile } from '@/hooks/use-mobile';
import { newProjects } from '@/data/masjidProjectsData';

const SupportNewMasjids: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-12 md:py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-gray-900">
          Support New and Upcoming Masjid Projects
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Help build the future of our community by contributing to these new masjid projects.
        </p>
        
        <MasjidCarousel projects={newProjects} />
      </div>
    </section>
  );
};

export default SupportNewMasjids;
