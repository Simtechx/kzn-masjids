
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

  // Auto-slide effect with a slower speed (4 seconds)
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % newProjects.length);
      }, 4000);
      
      return () => clearInterval(interval);
    }
  }, [isPaused, newProjects.length]);
  
  // Set transform style direct on container
  const transformStyle = {
    transform: `translateX(-${currentSlide * 100}%)`
  };

  return (
    <section className="py-16 md:py-20 px-4 bg-gray-100 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-teal-50 opacity-70"></div>
      
      <div className="container mx-auto relative z-10">
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-gray-900">
          Support New and Upcoming Masjid Projects
        </h2>
        
        {/* Added slogan line below header */}
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Help build places of worship for future generations by contributing to these ongoing projects.
        </p>
        
        {/* 3D Perspective Gallery-style Slider */}
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
                <Card className="border-2 border-yellow-700/30 shadow-xl overflow-hidden">
                  <div className={`relative ${isMobile ? 'h-120' : 'h-72 md:h-96'}`}>
                    <img 
                      src={project.image}
                      alt={project.name}
                      className="h-full w-full object-cover"
                    />
                    {/* Dark overlay with transparency only on text area */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                    
                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="bg-black/30 backdrop-blur-sm p-4 rounded-lg inline-block">
                        <h3 className="text-white font-bold text-xl md:text-2xl">{project.name}</h3>
                        <p className="text-white/80 text-sm md:text-base">{project.location}</p>
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white font-medium">Project Progress</span>
                          <span className="font-medium text-white">{project.completionPercentage}%</span>
                        </div>
                        <Progress 
                          value={project.completionPercentage} 
                          className="h-2 mb-3 bg-white/20" 
                          indicatorClassName="bg-teal-600"
                        />
                        
                        <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 mt-2">
                          Contribute
                        </Button>
                      </div>
                    </div>
                    
                    {/* Project Completion Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-800 text-white text-xs px-4 py-2 rounded-full font-semibold">
                        {project.completionPercentage}% Complete
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Pagination indicators - Updated color to match #062C25 */}
          <div className="flex justify-center mt-6 space-x-2">
            {newProjects.map((_, index) => (
              <button
                key={index}
                className={`h-3 rounded-full transition-all ${
                  currentSlide === index ? "w-8 bg-yellow-500" : "w-3 bg-[#062C25]"
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
