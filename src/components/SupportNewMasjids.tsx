
import React, { useEffect, useRef } from 'react';
import { Carousel } from '@/components/ui/carousel';
import { CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HandHeart } from 'lucide-react';

interface NewMasjidProjectProps {
  name: string;
  location: string;
  image: string;
  completionPercentage: number;
}

const NewMasjidProject: React.FC<NewMasjidProjectProps> = ({ name, location, image, completionPercentage }) => {
  return (
    <Card className="hover:shadow-md transition-shadow overflow-hidden h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 w-full bg-black/60 text-white p-2">
          <div className="text-sm">{completionPercentage}% Complete</div>
          <div className="w-full bg-gray-300 h-1.5 rounded-full">
            <div 
              className="bg-islamic-gold h-1.5 rounded-full" 
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold mb-1">{name}</h3>
        <p className="text-gray-600 text-sm mb-3">{location}</p>
        <Button size="sm" className="w-full bg-islamic-gold hover:bg-islamic-gold/90 text-black">
          <HandHeart className="mr-2" size={16} />
          Contribute
        </Button>
      </CardContent>
    </Card>
  );
};

const SupportNewMasjids: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  
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
          // If we're at the end, scroll back to the beginning
          if (!emblaApi.canScrollNext()) {
            emblaApi.scrollTo(0);
          }
        }
      }, 7000); // Scroll every 7 seconds
    };
    
    startAutoScroll();
    
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-center text-3xl font-bold mb-2 text-islamic-blue">
          Support New and Upcoming Masjid Projects Near You
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Help build the future of our community by contributing to these new masjid projects.
        </p>
        
        <Carousel
          ref={carouselRef}
          className="w-full" 
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {newProjects.map((project, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <NewMasjidProject
                  name={project.name}
                  location={project.location}
                  image={project.image}
                  completionPercentage={project.completionPercentage}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8 gap-2">
            <CarouselPrevious className="static transform-none mx-2" />
            <CarouselNext className="static transform-none mx-2" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default SupportNewMasjids;
