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
import { toast } from 'sonner';

interface NoticeItem {
  id: number;
  title: string;
  imageUrl: string;
  category: string;
}

const NoticesSection = () => {
  // Tab state
  const [activeTab, setActiveTab] = useState("upcoming");
  // Carousel state
  const [activeIndex, setActiveIndex] = useState(0);
  // Auto-scroll interval ref
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  // API ref
  const apiRef = useRef<any>(null);
  // Notices state
  const [noticesByCategory, setNoticesByCategory] = useState<Record<string, NoticeItem[]>>({
    upcoming: [],
    jumuah: [],
    info: []
  });
  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Fetch notices data from the API
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setIsLoading(true);
        
        // Replace with your actual notices API URL
        const response = await fetch('https://api-endpoint-for-notices.com');
        
        if (!response.ok) {
          throw new Error('Failed to fetch notices');
        }
        
        const data = await response.json();
        
        // Process and organize notices by category
        const categorizedNotices: Record<string, NoticeItem[]> = {
          upcoming: [],
          jumuah: [],
          info: []
        };
        
        // Assuming data has an array of notice items with category field
        if (data && Array.isArray(data)) {
          data.forEach((notice: any, index: number) => {
            const category = notice.category?.toLowerCase() || 'info';
            
            // Only add to valid categories
            if (['upcoming', 'jumuah', 'info'].includes(category)) {
              categorizedNotices[category].push({
                id: notice.id || index + 1,
                title: notice.title || 'Notice',
                imageUrl: notice.imageUrl || '/placeholder.svg',
                category: category
              });
            }
          });
          
          setNoticesByCategory(categorizedNotices);
          toast.success('Notices loaded successfully');
        } else {
          console.error('Invalid notices data format');
          // Fallback to sample notices
          setFallbackNotices();
        }
      } catch (error) {
        console.error('Error fetching notices:', error);
        // Fallback to sample notices
        setFallbackNotices();
      } finally {
        setIsLoading(false);
      }
    };
    
    // Fallback function to set sample notices
    const setFallbackNotices = () => {
      // Sample notice data with the uploaded images
      const fallbackNotices = {
        upcoming: [
          {
            id: 1,
            title: 'Programme of Hazrat Mufti Ebrahim Salejee Saheb',
            imageUrl: '/lovable-uploads/1aa475c9-533e-438b-94dd-2b14888da4c6.png',
            category: 'upcoming'
          },
          {
            id: 2,
            title: 'Overnight Programme by Moulana Dawood Seedat',
            imageUrl: '/lovable-uploads/da845ade-e36e-4896-b02b-1df6115252f9.png',
            category: 'upcoming'
          },
          {
            id: 3,
            title: 'Qira\'ah Programme at Musjid E Fathima',
            imageUrl: '/lovable-uploads/d34accea-4a90-4b43-a11d-57cff067fee1.png',
            category: 'upcoming'
          },
        ],
        jumuah: [
          {
            id: 4,
            title: 'Vacancy at Masjid Abu Hurairah',
            imageUrl: '/lovable-uploads/c895f89a-c76c-4255-9197-7c34b491f0e9.png',
            category: 'jumuah'
          },
          {
            id: 5,
            title: 'Sayyidah Saarah Programme',
            imageUrl: '/lovable-uploads/313997ac-0790-47fa-a6e0-f866759aeeaa.png',
            category: 'jumuah'
          },
          {
            id: 6,
            title: 'Time to quit vaping - Islamic guidance',
            imageUrl: '/lovable-uploads/9b13c55e-ffe1-4f98-8f3a-40c5ea3e92f8.png',
            category: 'jumuah'
          },
        ],
        info: [
          {
            id: 7,
            title: 'How well do you know Prophet Muhammed',
            imageUrl: '/lovable-uploads/bedd9f31-e8a9-4c97-8e9a-1f6537102fcf.png',
            category: 'info'
          },
          {
            id: 8,
            title: 'Live Q&A with Mufti AK Hoosen',
            imageUrl: '/lovable-uploads/82c4aa87-c484-4be2-971b-29c13813209f.png',
            category: 'info'
          },
          {
            id: 9,
            title: 'Mufti AK Hoosen North West Lecture Program',
            imageUrl: '/lovable-uploads/b7d90975-0a6e-455a-93ad-7cc9c0bbc832.png',
            category: 'info'
          },
          {
            id: 10,
            title: 'Dua for the Hujjaaj',
            imageUrl: '/lovable-uploads/cc46818d-f28a-4053-b8d2-2c0cfb3c55c4.png',
            category: 'info'
          },
          {
            id: 11,
            title: 'A Nikah of Sunnah & Simplicity',
            imageUrl: '/lovable-uploads/4c0618ff-2ece-4fd1-8dde-4143093b3f17.png',
            category: 'info'
          },
          {
            id: 12,
            title: 'Jumuah at Musjid-e-Noor',
            imageUrl: '/lovable-uploads/519bdaab-60ab-4d89-ab90-c74908a062f7.png',
            category: 'info'
          },
          {
            id: 13,
            title: 'This Week\'s Salah Times at Musjidus Salaam',
            imageUrl: '/lovable-uploads/d60b7fe3-2bd1-4d28-ac12-6d656397fb6c.png',
            category: 'info'
          },
        ],
      };
      
      setNoticesByCategory(fallbackNotices);
    };
    
    // Call the fetch function
    fetchNotices();
  }, []);

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
        if (notices && notices.length > 0) {
          const nextIdx = (currentIdx + 1) % notices.length;
          apiRef.current.scrollTo(nextIdx);
        }
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
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
          </div>
        ) : noticesByCategory[activeTab]?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">No notices available in this category</p>
          </div>
        ) : (
          /* Adaptive Image Carousel - Adjusts to image dimensions */
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
                        "relative w-[350px] max-h-[600px] min-h-[350px] transition-all duration-500 ease-out rounded-xl overflow-hidden",
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
                        className="w-full h-auto max-w-full"
                        onLoad={(e) => {
                          // Adjust container height based on aspect ratio
                          const img = e.target as HTMLImageElement;
                          const container = img.parentElement;
                          if (container) {
                            container.style.height = 'auto';
                            container.style.minHeight = `${img.height}px`;
                          }
                        }}
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
        )}
      </div>
    </section>
  );
};

export default NoticesSection;
