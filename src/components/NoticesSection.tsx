
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const NoticesSection = () => {
  // Tab state
  const [activeTab, setActiveTab] = useState("upcoming");
  // Carousel state
  const [activeIndex, setActiveIndex] = useState(0);
  // Auto-scroll interval ref
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Sample notice data with images for each category
  const noticesByCategory = {
    upcoming: [
      {
        id: 1,
        title: 'Overnight Programme of Hazrat Mufti',
        imageUrl: 'https://images.unsplash.com/photo-1466442929976-97f336a657be',
      },
      {
        id: 2,
        title: 'Programme at Musjid Fatimah',
        imageUrl: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb',
      },
      {
        id: 3,
        title: 'Programme of Hazrat Moulana Muhammad Ilyas Patel',
        imageUrl: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
      },
    ],
    jumuah: [
      {
        id: 4,
        title: 'Jumuah at Westville Masjid',
        imageUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
      },
      {
        id: 5,
        title: 'Jumuah Talk at Grey Street Masjid',
        imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      },
      {
        id: 6,
        title: 'Special Jumuah Programme',
        imageUrl: 'https://images.unsplash.com/photo-1560264234-b5618a0bfb0c',
      },
    ],
    times: [
      {
        id: 7,
        title: 'Updated Salaah Times for Winter',
        imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149',
      },
      {
        id: 8,
        title: 'Taraweeh Times Announcement',
        imageUrl: 'https://images.unsplash.com/photo-1551038247-3d9af20df552',
      },
      {
        id: 9,
        title: 'New Fajr Time Schedule',
        imageUrl: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e',
      },
    ],
  };

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Reset carousel to first image on tab change
    setActiveIndex(0);
  };

  // Navigate carousel
  const navigateCarousel = useCallback((direction: 'next' | 'prev') => {
    const images = noticesByCategory[activeTab as keyof typeof noticesByCategory];
    if (direction === 'next') {
      setActiveIndex(prev => (prev + 1) % images.length);
    } else {
      setActiveIndex(prev => (prev - 1 + images.length) % images.length);
    }
  }, [activeTab, noticesByCategory]);

  // Auto-scroll carousel
  useEffect(() => {
    // Clear previous interval if any
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start new interval
    intervalRef.current = setInterval(() => {
      navigateCarousel('next');
    }, 5000);

    // Clean up interval on unmount or tab change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [navigateCarousel, activeTab]);

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
        
        {/* Vertical A4 Carousel */}
        <div className="relative w-[350px] h-[500px] mx-auto overflow-hidden rounded-xl shadow-xl">
          {/* Navigation Arrows */}
          <button 
            className="absolute top-2 left-1/2 -translate-x-1/2 z-10 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
            onClick={() => navigateCarousel('prev')}
          >
            <ChevronUp size={24} />
          </button>
          <button 
            className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
            onClick={() => navigateCarousel('next')}
          >
            <ChevronDown size={24} />
          </button>
          
          {/* Carousel Images */}
          {noticesByCategory[activeTab as keyof typeof noticesByCategory].map((notice, index) => (
            <div
              key={notice.id}
              className={cn(
                "absolute inset-0 transition-all duration-500 ease-in-out rounded-xl overflow-hidden",
                activeIndex === index 
                  ? "opacity-100 translate-y-0" 
                  : index < activeIndex 
                    ? "opacity-0 -translate-y-full" 
                    : "opacity-0 translate-y-full"
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
          ))}
        </div>
        
        {/* Image counter */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            {activeIndex + 1} / {noticesByCategory[activeTab as keyof typeof noticesByCategory].length}
          </p>
        </div>
      </div>
    </section>
  );
};

export default NoticesSection;
