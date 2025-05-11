
import React, { useEffect, useRef, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HandHeart, ArrowLeft, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface NewMasjidProjectProps {
  name: string;
  location: string;
  image: string;
  completionPercentage: number;
}

const NewMasjidProject: React.FC<NewMasjidProjectProps> = ({ name, location, image, completionPercentage }) => {
  return (
    <Card className="overflow-hidden rounded-xl shadow-lg h-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent pt-8 pb-3 px-4">
          <div className="flex justify-between items-center text-white mb-1">
            <div className="font-medium">{completionPercentage}% Complete</div>
          </div>
          <div className="w-full bg-gray-300/40 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-islamic-gold h-2 rounded-full" 
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-1 text-islamic-blue">{name}</h3>
        <p className="text-gray-600 text-sm mb-4">{location}</p>
        <Button 
          size="sm" 
          className="w-full bg-islamic-gold hover:bg-islamic-gold/90 text-black transition-colors font-semibold"
        >
          <HandHeart className="mr-2" size={16} />
          Contribute
        </Button>
      </div>
    </Card>
  );
};

const SupportNewMasjids: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();
  
  const newProjects = [
    {
      name: "Masjid Al-Noor",
      location: "Phoenix, Durban",
      image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80",
      completionPercentage: 65
    },
    {
      name: "Masjid Al-Furqan",
      location: "Pietermaritzburg",
      image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&q=80",
      completionPercentage: 40
    },
    {
      name: "Musgrave Islamic Center",
      location: "Musgrave, Durban",
      image: "https://images.unsplash.com/photo-1551038247-3d9af20df552?auto=format&fit=crop&q=80",
      completionPercentage: 85
    },
    {
      name: "Juma Masjid",
      location: "Verulam",
      image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80",
      completionPercentage: 25
    },
    {
      name: "Masjid Al-Rahma",
      location: "Chatsworth",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80",
      completionPercentage: 55
    }
  ];

  // Set up auto-scrolling carousel
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    
    let intervalId: number;
    
    const startAutoScroll = () => {
      intervalId = window.setInterval(() => {
        const emblaApi = (carousel as any).__emblaApi;
        if (emblaApi) {
          emblaApi.scrollNext();
          // Update active index
          const currentIndex = emblaApi.selectedScrollSnap();
          setActiveIndex(currentIndex);
        }
      }, 5000); // Scroll every 5 seconds
    };
    
    startAutoScroll();
    
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Handle manual navigation
  const handleSlideChange = (index: number) => {
    const carousel = carouselRef.current;
    if (carousel) {
      const emblaApi = (carousel as any).__emblaApi;
      if (emblaApi) {
        emblaApi.scrollTo(index);
        setActiveIndex(index);
      }
    }
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-2 text-islamic-blue">
          Support New and Upcoming Masjid Projects Near You
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Help build the future of our community by contributing to these new masjid projects.
        </p>
        
        <div className="relative">
          <Carousel
            ref={carouselRef}
            className="w-full" 
            opts={{
              align: "center",
              loop: true,
              skipSnaps: false,
            }}
          >
            <CarouselContent className="-ml-4">
              {newProjects.map((project, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className={`transition-all duration-500 ${activeIndex === index ? 'scale-100 opacity-100' : 'scale-95 opacity-80'}`}>
                    <NewMasjidProject
                      name={project.name}
                      location={project.location}
                      image={project.image}
                      completionPercentage={project.completionPercentage}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          
          <div className="flex justify-center mt-6 gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full border-islamic-gold text-islamic-blue hover:bg-islamic-gold/10 hover:text-islamic-blue"
              onClick={() => {
                const carousel = carouselRef.current;
                if (carousel) {
                  const emblaApi = (carousel as any).__emblaApi;
                  if (emblaApi) emblaApi.scrollPrev();
                }
              }}
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Previous slide</span>
            </Button>
            
            <div className="flex gap-1.5 items-center">
              {newProjects.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'bg-islamic-gold w-4' : 'bg-gray-300'
                  }`}
                  onClick={() => handleSlideChange(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full border-islamic-gold text-islamic-blue hover:bg-islamic-gold/10 hover:text-islamic-blue"
              onClick={() => {
                const carousel = carouselRef.current;
                if (carousel) {
                  const emblaApi = (carousel as any).__emblaApi;
                  if (emblaApi) emblaApi.scrollNext();
                }
              }}
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
