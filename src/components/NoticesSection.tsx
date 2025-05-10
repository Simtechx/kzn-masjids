
import React, { useEffect, useRef } from 'react';
import { Carousel } from '@/components/ui/carousel';
import { CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from "@/components/ui/aspect-ratio";

const NoticesSection = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Sample notice data with 6 images as requested
  const notices = [
    {
      id: 1,
      title: 'Overnight Programme of Hazrat Mufti',
      content: '17-18 May 2025 at Madrasah Ta\'leemudeen',
      imageUrl: 'https://images.unsplash.com/photo-1466442929976-97f336a657be',
    },
    {
      id: 2,
      title: 'Programme at Musjid Fatimah',
      content: 'Sunday, 4th May 2025 after Fajr',
      imageUrl: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb',
    },
    {
      id: 3,
      title: 'Programme of Hazrat Moulana Muhammad Ilyas Patel',
      content: 'Tuesday 06 May at Musalla An Noor after Esha',
      imageUrl: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
    },
    {
      id: 4,
      title: 'Islamic Awareness Week',
      content: 'Join us for a week of Islamic education and awareness activities',
      imageUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
    },
    {
      id: 5,
      title: 'Charity Collection Drive',
      content: 'Support our annual charity drive for those in need',
      imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
    },
    {
      id: 6,
      title: 'Weekly Tafseer Classes',
      content: 'Every Thursday after Maghrib prayer at Masjid-ul-Noor',
      imageUrl: 'https://images.unsplash.com/photo-1560264234-b5618a0bfb0c',
    },
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
      }, 5000); // Scroll every 5 seconds
    };
    
    startAutoScroll();
    
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-center text-3xl font-bold mb-2 text-teal-800">
          NOTICES
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
          Stay informed about the latest events, programs, and inspirational content
        </p>
        
        <Carousel 
          ref={carouselRef}
          className="w-full max-w-5xl mx-auto"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {notices.map((notice) => (
              <CarouselItem key={notice.id} className="pl-2 md:pl-4 md:basis-1/3">
                <Card className="border-none shadow-xl overflow-hidden h-full">
                  <CardContent className="p-0">
                    <AspectRatio ratio={4 / 3}>
                      <img
                        src={notice.imageUrl}
                        alt={notice.title}
                        className="object-cover w-full h-full"
                      />
                    </AspectRatio>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">{notice.title}</h3>
                      <p className="text-gray-600">{notice.content}</p>
                    </div>
                  </CardContent>
                </Card>
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

export default NoticesSection;
