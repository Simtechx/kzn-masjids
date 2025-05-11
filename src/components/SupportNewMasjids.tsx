
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

  // Auto-slide effect with slower speed (3.5 seconds)
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % newProjects.length);
      }, 3500); // Keep the existing 3.5 seconds
      
      return () => clearInterval(interval);
    }
  }, [isPaused, newProjects.length]);
  
  // Set transform style direct on container
  const transformStyle = {
    transform: `translateX(-${currentSlide * 100}%)`
  };

  return (
    <section className="py-12 md:py-16 px-4 bg-gray-100 relative overflow-hidden">
      {/* 3D Perspective Gallery-like Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-teal-50 opacity-70"></div>
      
      <div className="container mx-auto relative z-10">
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-10 text-gray-900">
          Support New and Upcoming Masjid Projects
        </h2>
        
        {/* 3D Perspective Gallery-style Slider */}
        <div 
          className="relative overflow-hidden rounded-xl w-full max-w-5xl mx-auto perspective-1000"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          ref={sliderRef}
          style={{perspective: '1000px'}}
        >
          {/* Carousel track with proper transform */}
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={transformStyle}
          >
            {newProjects.map((project, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <Card className="border-2 border-amber-400/30 shadow-xl overflow-hidden transform transition-all hover:scale-[1.01]" 
                      style={{
                        transformStyle: 'preserve-3d',
                        boxShadow: '0 15px 25px rgba(0, 0, 0, 0.1)'
                      }}>
                  <div className="relative h-64 md:h-80">
                    <img 
                      src={project.image}
                      alt={project.name}
                      className="h-full w-full object-cover"
                    />
                    {/* Dark overlay for better contrast with the elements inside image area */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      {/* Semi-transparent light block behind text content */}
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                        <h3 className="text-white font-bold text-xl md:text-2xl">{project.name}</h3>
                        <p className="text-white/80 text-sm md:text-base">{project.location}</p>
                        
                        {/* Project progress moved inside the image area */}
                        <div className="mt-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-white/90">Project Progress</span>
                            <span className="font-medium text-white">{project.completionPercentage}%</span>
                          </div>
                          <Progress 
                            value={project.completionPercentage} 
                            className="h-2 mb-3 bg-white/20" 
                            indicatorClassName="bg-teal-600" 
                          />
                          {/* Dark Yellow Contribute Button moved inside image area */}
                          <Button className="w-full bg-yellow-800 hover:bg-yellow-900 text-white font-bold py-2 mt-2">
                            Contribute
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Project Completion Badge - Dark yellow style for better theme match */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-800 text-white text-sm font-bold px-4 py-2 rounded-full">
                        {project.completionPercentage}% Complete
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Pagination indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {newProjects.map((_, index) => (
              <button
                key={index}
                className={`h-3 rounded-full transition-all ${
                  currentSlide === index ? "w-8 bg-yellow-800" : "w-3 bg-gray-300"
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
