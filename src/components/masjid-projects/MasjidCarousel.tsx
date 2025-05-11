
import React, { useEffect, useRef, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import NewMasjidProject, { NewMasjidProjectProps } from './NewMasjidProject';

interface MasjidCarouselProps {
  projects: NewMasjidProjectProps[];
}

const MasjidCarousel: React.FC<MasjidCarouselProps> = ({ projects }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  
  // Handle manual navigation
  const handlePrev = () => {
    if (carouselRef.current) {
      const emblaApi = (carouselRef.current as any).__emblaApi;
      if (emblaApi) {
        emblaApi.scrollPrev();
      }
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      const emblaApi = (carouselRef.current as any).__emblaApi;
      if (emblaApi) {
        emblaApi.scrollNext();
      }
    }
  };

  const handleCarouselChange = (api: any) => {
    if (api) {
      const currentIndex = api.selectedScrollSnap();
      setActiveIndex(currentIndex);
    }
  };

  // Set up auto-scrolling carousel with faster speed
  useEffect(() => {
    const startAutoScroll = () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
      
      intervalRef.current = setTimeout(() => {
        if (!isPaused && carouselRef.current) {
          const emblaApi = (carouselRef.current as any).__emblaApi;
          if (emblaApi) {
            emblaApi.scrollNext();
            handleCarouselChange(emblaApi);
          }
        }
        startAutoScroll(); // Recursively call to create a loop
      }, 3000); // Reduced from 4000ms to 3000ms for faster sliding
    };
    
    startAutoScroll();
    
    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [isPaused]);
  
  return (
    <div className="relative max-w-5xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Carousel
        ref={carouselRef}
        className="w-full" 
        opts={{
          align: "center",
          loop: true,
          dragFree: true,
        }}
        setApi={(api) => {
          api?.on("select", () => handleCarouselChange(api));
        }}
      >
        <CarouselContent className="transition-all duration-500 ease-in-out">
          {projects.map((project, index) => (
            <CarouselItem 
              key={index} 
              className="pl-4 basis-full md:basis-3/4 lg:basis-3/5 transition-all duration-300"
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
      
      <div className="flex justify-center mt-8 gap-4">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full border-amber-500 text-amber-700 hover:bg-amber-50"
          onClick={handlePrev}
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Previous slide</span>
        </Button>
        
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
        
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full border-amber-500 text-amber-700 hover:bg-amber-50"
          onClick={handleNext}
        >
          <ArrowRight className="h-5 w-5" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>
    </div>
  );
};

export default MasjidCarousel;
