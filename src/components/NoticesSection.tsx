
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getImageDimensions } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface NoticeItem {
  id: number;
  title: string;
  image: string;
  category: string;
  dimensions?: {
    width: number;
    height: number;
    aspectRatio: number;
  };
}

// Mock data as fallback
const mockNotices = {
  upcoming: [
    {
      id: 1,
      title: "Vacancy - Masjid Abu Hurairah",
      image: "/lovable-uploads/087b6459-3d7d-41fb-a08c-46066e0e41ab.png",
      category: "upcoming"
    },
    {
      id: 2,
      title: "Programme of Hazrat Mufti Ebrahim Salejee",
      image: "/lovable-uploads/f75d6a2e-5b07-4cf3-a119-5af96257e5b2.png",
      category: "upcoming"
    }
  ],
  jumuah: [
    {
      id: 3,
      title: "Qira'ah Programme",
      image: "/lovable-uploads/eaecb088-d4d0-4b62-b068-c89e23f956b7.png",
      category: "jumuah"
    }
  ],
  info: [
    {
      id: 4,
      title: "Time to Quit Vaping",
      image: "/lovable-uploads/1b0f1fde-f17a-42d9-bd2b-2c2584d54361.png",
      category: "info"
    }
  ]
};

const NoticesSection = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [noticesData, setNoticesData] = useState<{[key: string]: NoticeItem[]}>({
    upcoming: [],
    jumuah: [],
    info: []
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Function to convert Google Drive URL to thumbnail URL
  const convertGoogleDriveUrl = (googleDriveUrl: string): string => {
    try {
      console.log('Converting URL:', googleDriveUrl);
      
      let fileId = '';
      
      // Extract file ID from various Google Drive URL formats
      
      // Handle format: https://drive.google.com/uc?export=view&id=FILE_ID
      const ucMatch = googleDriveUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (ucMatch && ucMatch[1]) {
        fileId = ucMatch[1];
      }
      
      // Handle format: https://drive.google.com/file/d/FILE_ID/view?usp=drivesdk
      if (!fileId) {
        const fileMatch = googleDriveUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
        if (fileMatch && fileMatch[1]) {
          fileId = fileMatch[1];
        }
      }
      
      // If we have a file ID, convert to thumbnail URL
      if (fileId) {
        const thumbnailUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
        console.log('Converted to thumbnail URL:', thumbnailUrl);
        return thumbnailUrl;
      }
      
      console.log('Could not extract file ID from URL:', googleDriveUrl);
      return googleDriveUrl;
    } catch (error) {
      console.error('Error converting Google Drive URL:', error);
      return googleDriveUrl;
    }
  };

  // Function to get image dimensions and calculate card height
  const getCardHeight = async (imageSrc: string): Promise<number> => {
    try {
      const dimensions = await getImageDimensions(imageSrc);
      // Different base widths for mobile vs desktop
      const isMobile = window.innerWidth < 768;
      const baseWidth = isMobile ? 300 : 320; // Slightly reduced for mobile
      const calculatedHeight = baseWidth / dimensions.aspectRatio;
      // Better height limits for mobile to match image proportions
      const minHeight = isMobile ? 200 : 240;
      const maxHeight = isMobile ? 400 : 480; // Increased max height for mobile to accommodate full images
      return Math.max(minHeight, Math.min(maxHeight, calculatedHeight));
    } catch (error) {
      console.error('Error getting image dimensions:', error);
      return window.innerWidth < 768 ? 280 : 320; // Default height based on screen size
    }
  };

  // Fetch data from JSON API
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        console.log('Fetching notices from API...');
        
        const response = await fetch('https://script.google.com/macros/s/AKfycbxb0c6zf_w39OoFdyCX7Jh1KGTSkj56bQneQeMXdQj2RbyTQTELg96Z7VINuvPNdFd-/exec');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);
        
        // Organize data by category
        const organizedData: {[key: string]: NoticeItem[]} = {
          upcoming: [],
          jumuah: [],
          info: []
        };
        
        const processedNotices = await Promise.all(
          data.map(async (item: any, index: number) => {
            const imageUrl = item['Image URL'] || '';
            const convertedImageUrl = convertGoogleDriveUrl(imageUrl);
            
            const notice: NoticeItem = {
              id: index + 1,
              title: item['File Name'] || `Notice ${index + 1}`,
              image: convertedImageUrl,
              category: item.Category ? item.Category.toLowerCase() : 'upcoming'
            };
            
            // Get image dimensions
            try {
              const dimensions = await getImageDimensions(convertedImageUrl);
              notice.dimensions = dimensions;
            } catch (error) {
              console.error('Could not get dimensions for image:', convertedImageUrl);
            }
            
            console.log('Processing notice:', notice);
            return notice;
          })
        );
        
        // Organize by category
        processedNotices.forEach((notice) => {
          const category = notice.category.toLowerCase();
          if (organizedData[category]) {
            organizedData[category].push(notice);
          } else {
            organizedData.upcoming.push(notice);
          }
        });
        
        console.log('Final organized data:', organizedData);
        setNoticesData(organizedData);
        
        // Show success toast with delay to avoid blocking other notifications
        setTimeout(() => {
          const totalNotices = Object.values(organizedData).reduce((total, notices) => total + notices.length, 0);
          toast({
            title: "Notices Loaded Successfully",
            description: `${totalNotices} notices loaded and images processed`,
          });
        }, 2000); // 2 second delay after other notifications
        
      } catch (error) {
        console.error('Error fetching notices:', error);
        console.log('Using mock data as fallback');
        setNoticesData(mockNotices);
        
        // Show error toast with delay to avoid blocking other notifications
        setTimeout(() => {
          toast({
            title: "Notice Loading Failed",
            description: "Using cached notices as fallback",
            variant: "destructive",
          });
        }, 2500); // 2.5 second delay after other notifications
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, [toast]);

  const tabs = ['upcoming', 'jumuah', 'info'];
  const currentNotices = noticesData[activeTab] || [];

  // Auto-slide functionality
  useEffect(() => {
    if (currentNotices.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % currentNotices.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [currentNotices.length]);

  // Reset slide when tab changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [activeTab]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % currentNotices.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + currentNotices.length) % currentNotices.length);
  };

  // Touch handling for mobile
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentNotices.length > 1) {
      nextSlide();
    }
    if (isRightSwipe && currentNotices.length > 1) {
      prevSlide();
    }
  };

  return (
    <section className="py-12 md:py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 text-gray-800">NOTICES</h2>
        <p className="text-center text-gray-600 mb-8 md:mb-12 text-sm md:text-base">Stay informed about the latest events, programs, and announcements</p>
        
        {/* Tabs */}
        <div className="flex justify-center mb-10 md:mb-16">
          <div className="flex bg-white shadow-sm rounded-full overflow-hidden p-1 w-full max-w-sm">
            {tabs.map(tab => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "ghost"}
                className={`rounded-full px-3 md:px-4 py-2 text-xs md:text-sm flex-1 capitalize ${
                  activeTab === tab 
                    ? 'bg-yellow-500 text-black hover:bg-yellow-600' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center h-60 md:h-80 mb-8 md:mb-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
              <p className="text-gray-500 font-medium text-sm md:text-base">Loading notices...</p>
            </div>
          </div>
        )}

        {/* 3D Carousel */}
        {!loading && currentNotices.length > 0 && (
          <div 
            className="relative mb-8 md:mb-12"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="relative h-80 md:h-96 flex items-center justify-center" 
              style={{ perspective: '1200px' }}
            >
              {currentNotices.map((notice, index) => {
                const offset = (index - currentSlide + currentNotices.length) % currentNotices.length;
                let transform = '';
                let zIndex = 1;
                let opacity = 0.4;
                
                if (offset === 0) {
                  // Center card
                  transform = 'translateX(-50%) translateZ(0px) rotateY(0deg) scale(1)';
                  zIndex = 10;
                  opacity = 1;
                } else if (offset === 1 || (offset === currentNotices.length - 1 && currentNotices.length === 2)) {
                  // Right card
                  transform = 'translateX(-20%) translateZ(-200px) rotateY(-25deg) scale(0.8)';
                  zIndex = 5;
                  opacity = 0.7;
                } else if (offset === currentNotices.length - 1 || (offset === 1 && currentNotices.length === 2)) {
                  // Left card
                  transform = 'translateX(-80%) translateZ(-200px) rotateY(25deg) scale(0.8)';
                  zIndex = 5;
                  opacity = 0.7;
                } else {
                  // Hidden cards
                  transform = 'translateX(-50%) translateZ(-300px) scale(0.6)';
                  zIndex = 1;
                  opacity = 0;
                }

                // Responsive card sizing with better mobile proportions
                const isMobile = window.innerWidth < 768;
                const cardWidth = isMobile ? 300 : 320; // Slightly reduced for mobile
                const baseWidth = isMobile ? 300 : 320;
                
                // Better height calculation for mobile to maintain image aspect ratio
                let cardHeight;
                if (notice.dimensions) {
                  const calculatedHeight = baseWidth / notice.dimensions.aspectRatio;
                  cardHeight = Math.max(isMobile ? 200 : 240, Math.min(isMobile ? 400 : 480, calculatedHeight));
                } else {
                  cardHeight = isMobile ? 280 : 320;
                }

                return (
                  <div
                    key={notice.id}
                    className="absolute left-1/2 transition-all duration-700 ease-out cursor-pointer"
                    style={{
                      transform,
                      zIndex,
                      opacity
                    }}
                    onClick={() => setCurrentSlide(index)}
                  >
                    <div 
                      className="bg-white rounded-xl shadow-xl overflow-hidden" 
                      style={{ 
                        height: cardHeight,
                        width: cardWidth
                      }}
                    >
                      <img
                        src={notice.image}
                        alt={notice.title}
                        className="w-full h-full object-contain" // Changed back to object-contain for better mobile display
                        style={{
                          objectPosition: 'center'
                        }}
                        onLoad={() => {
                          console.log('Image loaded successfully:', notice.image);
                        }}
                        onError={(e) => {
                          console.error('Image failed to load:', notice.image);
                          console.error('Error event:', e);
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Arrows - Hidden on mobile */}
            {currentNotices.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-700 shadow-lg rounded-full p-2 md:p-3 transition-colors hidden md:block"
                >
                  <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-700 shadow-lg rounded-full p-2 md:p-3 transition-colors hidden md:block"
                >
                  <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                </button>
              </>
            )}

            {/* Dots Indicator */}
            {currentNotices.length > 1 && (
              <div className="flex justify-center mt-8 md:mt-10 space-x-2">
                {currentNotices.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors duration-300 ${
                      index === currentSlide ? 'bg-yellow-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* No notices state */}
        {!loading && currentNotices.length === 0 && (
          <div className="flex justify-center items-center h-60 md:h-80 mb-8 md:mb-12">
            <div className="text-center">
              <p className="text-gray-500 font-medium text-sm md:text-base">No notices available for {activeTab}</p>
              <p className="text-gray-400 text-xs md:text-sm mt-1">Check back soon for updates</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NoticesSection;
