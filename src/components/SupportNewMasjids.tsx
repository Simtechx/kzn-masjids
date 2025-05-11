
import React, { useState, useEffect, useRef } from 'react';
import { newProjects } from '@/data/masjidProjectsData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useIsMobile } from '@/hooks/use-mobile';
import { DollarSign } from 'lucide-react';

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
      }, 3500);
      
      return () => clearInterval(interval);
    }
  }, [isPaused, newProjects.length]);
  
  // Set transform style direct on container
  const transformStyle = {
    transform: `translateX(-${currentSlide * 100}%)`
  };

  return (
    <section className="py-12 md:py-16 px-4 bg-gray-100 relative overflow-hidden">
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
                  <div className="relative h-64 md:h-80">
                    <img 
                      src={project.image}
                      alt={project.name}
                      className="h-full w-full object-cover"
                    />
                    {/* Dark overlay for better contrast with text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    
                    {/* Content overlay similar to reference image */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg">
                        <h3 className="text-white font-bold text-xl md:text-2xl">{project.name}</h3>
                        <p className="text-white/80 text-sm md:text-base">{project.location}</p>
                        
                        <div className="mt-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-white/90">Project Progress</span>
                            <span className="font-medium text-yellow-400">{project.completionPercentage}%</span>
                          </div>
                          <Progress 
                            value={project.completionPercentage} 
                            className="h-2 mb-3 bg-white/20" 
                            indicatorClassName="bg-yellow-600"
                          />
                          
                          {/* Yellow Contribute Button */}
                          <Button className="w-full bg-yellow-700 hover:bg-yellow-800 text-white font-bold py-2 mt-2">
                            <DollarSign className="h-4 w-4 mr-1" />
                            Contribute
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Project Completion Badge */}
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
