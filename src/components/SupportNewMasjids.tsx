
import React, { useState, useEffect, useRef } from 'react';
import { newProjects } from '@/data/masjidProjectsData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useIsMobile } from '@/hooks/use-mobile';

const SupportNewMasjids: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isMobile = useIsMobile();
  const sliderRef = useRef<HTMLDivElement>(null);

  // Auto-slide effect with faster speed (1 second)
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % newProjects.length);
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isPaused, newProjects.length]);
  
  // Set transform style direct on container
  const transformStyle = {
    transform: `translateX(-${currentSlide * 100}%)`
  };

  return (
    <section className="py-12 md:py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-gray-900">
          Support New and Upcoming Masjid Projects
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Help build the future of our community by contributing to these new masjid projects.
        </p>
        
        {/* Simplified, optimized auto-sliding carousel */}
        <div 
          className="relative overflow-hidden rounded-xl w-full max-w-5xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          ref={sliderRef}
        >
          {/* Carousel track with proper transform */}
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={transformStyle}
          >
            {newProjects.map((project, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <Card className="border-0 shadow-lg overflow-hidden">
                  <div className="relative h-52 md:h-80">
                    <img 
                      src={project.image}
                      alt={project.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <h3 className="text-white font-bold text-xl md:text-2xl">{project.name}</h3>
                      <p className="text-white/80 text-sm md:text-base">{project.location}</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="font-bold text-white bg-[#094941] px-2 py-1 rounded-md text-sm">
                        {project.completionPercentage}% Complete
                      </span>
                    </div>
                    <Progress value={project.completionPercentage} className="h-2 mb-6" />
                    <p className="mb-4 text-gray-700">{project.description || 'Help us complete this important project for the community.'}</p>
                    <div className="flex justify-between gap-4">
                      <Button className="flex-1" variant="outline">Learn More</Button>
                      <Button className="flex-1 bg-teal-600 hover:bg-teal-700">Donate Now</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Pagination indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {newProjects.map((_, index) => (
              <button
                key={index}
                className={`h-2.5 rounded-full transition-all ${
                  currentSlide === index ? "w-6 bg-teal-600" : "w-2.5 bg-gray-300"
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportNewMasjids;
