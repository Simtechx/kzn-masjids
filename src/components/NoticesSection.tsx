
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const NoticesSection = () => {
  // Tab state
  const [activeTab, setActiveTab] = useState("upcoming");
  // Carousel state
  const [activeIndex, setActiveIndex] = useState(0);
  // Auto-scroll interval ref
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  // API ref
  const apiRef = useRef<any>(null);

  // Sample notice data with images for each category
  const noticesByCategory = {
    upcoming: [
      {
        id: 1,
        title: 'Programme of Hazrat Moulana Muhammad Ilyas Patel',
        imageUrl: '/lovable-uploads/863f3c64-7246-4879-81c9-71a2dbea0c0d.png',
      },
      {
        id: 2,
        title: 'Esha Program - Moulana Abdul Hamid Is\'haq Saheb',
        imageUrl: '/lovable-uploads/57eb7a84-f403-4986-a96a-b5f642da8e82.png',
      },
      {
        id: 3,
        title: 'Jumu\'ah at Musjid-e-Noor',
        imageUrl: '/lovable-uploads/9bc39627-d180-4dfd-a550-d10fac634cfc.png',
      },
    ],
    jumuah: [
      {
        id: 4,
        title: 'Jumu\'ah Programme at Musjidus Salaam',
        imageUrl: '/lovable-uploads/8dc82f4b-e6fd-47b6-bdda-06b346a66680.png',
      },
      {
        id: 5,
        title: 'The Rights of the Qur\'aan - Qari Hamzah Desai',
        imageUrl: '/lovable-uploads/2ea75a4a-9396-40e6-889f-8847fb4bef2c.png',
      },
      {
        id: 6,
        title: 'Jumu\'ah at Musjid Al Hilal',
        imageUrl: '/lovable-uploads/df3d0962-27b7-4675-b73e-84c421ef2084.png',
      },
    ],
    info: [
      {
        id: 7,
        title: 'This Week\'s Salaah Times at Musjidus Salaam',
        imageUrl: '/lovable-uploads/2c640944-0b92-4b22-bbe3-3b88e1afa1d1.png',
      },
      {
        id: 8,
        title: 'Live Q&A with Mufti AK Hoosen',
        imageUrl: '/lovable-uploads/82c4aa87-c484-4be2-971b-29c13813209f.png',
      },
      {
        id: 9,
        title: 'Mufti AK Hoosen North West Lecture Program',
        imageUrl: '/lovable-uploads/b7d90975-0a6e-455a-93ad-7cc9c0bbc832.png',
      },
      {
        id: 10,
        title: 'Dua for the Hujjaaj',
        imageUrl: '/lovable-uploads/cc46818d-f28a-4053-b8d2-2c0cfb3c55c4.png',
      },
      {
        id: 11,
        title: 'A Nikah of Sunnah & Simplicity',
        imageUrl: '/lovable-uploads/4c0618ff-2ece-4fd1-8dde-4143093b3f17.png',
      },
      {
        id: 12,
        title: 'Programme at Musjid Fatimah',
        imageUrl: '/lovable-uploads/4cdb470c-43c1-4810-9a5d-253b4183dda4.png',
      },
    ],
  };

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Reset carousel to first image on tab change
    setActiveIndex(0);
    if (apiRef.current) {
      apiRef.current.scrollTo(0);
    }
  };

  // Handle carousel change
  const handleCarouselChange = useCallback((api: any) => {
    const currentIndex = api.selectedScrollSnap();
    setActiveIndex(currentIndex);
  }, []);

  // Auto-scroll carousel
  useEffect(() => {
    // Clear previous interval if any
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start new interval
    intervalRef.current = setInterval(() => {
      if (apiRef.current) {
        const currentIdx = apiRef.current.selectedScrollSnap();
        const notices = noticesByCategory[activeTab as keyof typeof noticesByCategory];
        const nextIdx = (currentIdx + 1) % notices.length;
        apiRef.current.scrollTo(nextIdx);
      }
    }, 5000);

    // Clean up interval on unmount or tab change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [activeTab, noticesByCategory]);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-center text-3xl font-bold mb-2 text-teal-800">
          NOTICES
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
          Stay informed about the latest events, programs, and announcements
        </p>
        
        {/* Tabs navigation */}
        <div className="flex justify-center space-x-4 mb-6">
          {Object.keys(noticesByCategory).map((tab) => (
            <button
              key={tab}
              className={cn(
                "px-6 py-2 rounded-lg font-medium transition-colors",
                activeTab === tab 
                  ? "bg-yellow-400 text-black" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
              onClick={() => handleTabChange(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Horizontal Apple Card-style Carousel */}
        <div className="w-full max-w-2xl mx-auto">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
            setApi={(api) => {
              apiRef.current = api;
              api?.on("select", () => handleCarouselChange(api));
            }}
          >
            <CarouselContent>
              {noticesByCategory[activeTab as keyof typeof noticesByCategory].map((notice, index) => (
                <CarouselItem 
                  key={notice.id}
                  className="md:basis-auto flex items-center justify-center"
                >
                  <div 
                    className={cn(
                      "relative w-[350px] h-[500px] transition-all duration-500 ease-out rounded-xl overflow-hidden",
                      "transform-gpu",
                      activeIndex === index 
                        ? "scale-100 z-20 shadow-2xl" 
                        : index === activeIndex - 1 || (activeIndex === 0 && index === noticesByCategory[activeTab as keyof typeof noticesByCategory].length - 1)
                          ? "-translate-x-[40px] scale-[0.85] z-10 opacity-70 shadow-lg"
                          : index === activeIndex + 1 || (activeIndex === noticesByCategory[activeTab as keyof typeof noticesByCategory].length - 1 && index === 0)
                            ? "translate-x-[40px] scale-[0.85] z-10 opacity-70 shadow-lg"
                            : "scale-[0.7] opacity-40 z-0"
                    )}
                  >
                    <img 
                      src={notice.imageUrl} 
                      alt={notice.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                      <h3 className="text-lg font-medium">{notice.title}</h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-1 z-30" />
            <CarouselNext className="absolute right-1 z-30" />
          </Carousel>
          
          {/* Image counter */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              {activeIndex + 1} / {noticesByCategory[activeTab as keyof typeof noticesByCategory].length}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoticesSection;
