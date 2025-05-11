
import React, { useEffect, useRef, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, ArrowLeft, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useIsMobile } from '@/hooks/use-mobile';

interface NewMasjidProjectProps {
  name: string;
  location: string;
  image: string;
  description: string;
  completionPercentage: number;
}

const NewMasjidProject: React.FC<NewMasjidProjectProps> = ({ 
  name, 
  location, 
  image, 
  description,
  completionPercentage 
}) => {
  return (
    <Card className="h-[420px] rounded-xl overflow-hidden border-2 border-amber-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex flex-col">
      <div className="relative h-[180px] overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-amber-500 text-white rounded-full text-sm font-medium">
            {completionPercentage}% Complete
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-1 text-gray-900">{name}</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">{location}</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 line-clamp-3">{description}</p>
        
        <div className="mt-auto">
          <div className="mb-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Project Progress</span>
              <span className="text-sm font-medium text-amber-600">{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2 bg-gray-200" />
          </div>
          
          <Button 
            className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-black font-semibold"
          >
            <DollarSign className="h-5 w-5 p-0.5 rounded-full border border-current" />
            Contribute
          </Button>
        </div>
      </div>
    </Card>
  );
};

const SupportNewMasjids: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const isMobile = useIsMobile();
  
  const newProjects = [
    {
      name: "Masjid Al-Noor",
      location: "Phoenix, Durban",
      image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80",
      description: "A new community masjid being built to serve the growing Muslim population in Phoenix. The masjid will include prayer halls, madrasah classrooms, and community facilities.",
      completionPercentage: 65
    },
    {
      name: "Masjid Al-Furqan",
      location: "Pietermaritzburg",
      image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&q=80",
      description: "Expansion project for the existing Masjid Al-Furqan to accommodate more worshippers and add educational facilities for the community.",
      completionPercentage: 40
    },
    {
      name: "Musgrave Islamic Center",
      location: "Musgrave, Durban",
      image: "https://images.unsplash.com/photo-1551038247-3d9af20df552?auto=format&fit=crop&q=80",
      description: "A modern Islamic center providing prayer facilities, educational programs, and community services to Muslims in the Musgrave area.",
      completionPercentage: 85
    },
    {
      name: "Juma Masjid",
      location: "Verulam",
      image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80",
      description: "Renovation and expansion of the historic Juma Masjid to preserve its heritage while providing modern facilities for worshippers.",
      completionPercentage: 25
    },
    {
      name: "Masjid Al-Rahma",
      location: "Chatsworth",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80",
      description: "Construction of Masjid Al-Rahma to serve as a community hub offering prayer spaces, Islamic education, and community outreach programs.",
      completionPercentage: 55
    }
  ];

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

  // Set up auto-scrolling carousel
  useEffect(() => {
    const startAutoScroll = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      intervalRef.current = window.setInterval(() => {
        if (!isPaused && carouselRef.current) {
          const emblaApi = (carouselRef.current as any).__emblaApi;
          if (emblaApi) {
            emblaApi.scrollNext();
            handleCarouselChange(emblaApi);
          }
        }
      }, 5000); // Scroll every 5 seconds
    };
    
    startAutoScroll();
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);

  return (
    <section className="py-12 md:py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-gray-900">
          Support New and Upcoming Masjid Projects
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Help build the future of our community by contributing to these new masjid projects.
        </p>
        
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
            }}
            setApi={(api) => {
              api?.on("select", () => handleCarouselChange(api));
            }}
          >
            <CarouselContent>
              {newProjects.map((project, index) => (
                <CarouselItem 
                  key={index} 
                  className={`pl-4 ${isMobile ? 'basis-full' : 'basis-1/2 lg:basis-1/3'} transition-all duration-300`}
                >
                  <NewMasjidProject
                    name={project.name}
                    location={project.location}
                    image={project.image}
                    description={project.description}
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
              {newProjects.map((_, index) => (
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
      </div>
    </section>
  );
};

export default SupportNewMasjids;
