
import React, { useEffect, useRef, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import NewMasjidProject, { NewMasjidProjectProps } from './NewMasjidProject';

interface MasjidCarouselProps {
  projects: NewMasjidProjectProps[];
}

const MasjidCarousel: React.FC<MasjidCarouselProps> = ({ projects }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  
  // Handle Carousel change
  const handleCarouselChange = (api: any) => {
    if (api) {
      const currentIndex = api.selectedScrollSnap();
      setActiveIndex(currentIndex);
    }
  };

  // Set up auto-scrolling carousel
  useEffect(() => {
    const startAutoScroll = () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
      
      intervalRef.current = setTimeout(() => {
        if (!isPaused && carouselRef.current) {
          const emblaApi = (carouselRef.current as any)?.__emblaApi;
          if (emblaApi) {
            emblaApi.scrollNext();
          }
        }
        startAutoScroll(); // Recursively call to create a loop
      }, 1000); // Slide every 1 second
    };
    
    // Start auto-scrolling
    startAutoScroll();
    
    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [isPaused, projects.length]);
  
  return (
    <div 
      className="relative max-w-5xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <Carousel
        ref={carouselRef}
        className="w-full" 
        opts={{
          align: "center",
          loop: true,
        }}
        onSelect={(api) => {
          handleCarouselChange(api);
        }}
      >
        <CarouselContent className="transition-all duration-500 ease-in-out">
          {projects.map((project, index) => (
            <CarouselItem 
              key={index} 
              className="md:pl-4 basis-full"
            >
              <NewMasjidProject
                name={project.name}
                location={project.location}
                image={project.image}
                completionPercentage={project.completionPercentage}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      
      <div className="flex justify-center mt-8">
        <div className="flex gap-2 items-center">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'bg-amber-500 w-4' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => {
                if (carouselRef.current) {
                  const emblaApi = (carouselRef.current as any).__emblaApi;
                  if (emblaApi) {
                    emblaApi.scrollTo(index);
                  }
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MasjidCarousel;
