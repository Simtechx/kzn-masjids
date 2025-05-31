import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NoticeItem {
  id: number;
  title: string;
  image: string;
  category: string;
}

// Mock data with the uploaded poster images
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
    },
    {
      id: 3,
      title: "Sayyidah Saarah Programme",
      image: "/lovable-uploads/34181ca3-ac38-4b18-8d0d-e18718b3b0f9.png",
      category: "upcoming"
    }
  ],
  jumuah: [
    {
      id: 4,
      title: "Qira'ah Programme",
      image: "/lovable-uploads/eaecb088-d4d0-4b62-b068-c89e23f956b7.png",
      category: "jumuah"
    },
    {
      id: 5,
      title: "Prophet Mohammed Quiz",
      image: "/lovable-uploads/0a47d0ac-e96f-4737-b2b8-aa1d1ab5653f.png",
      category: "jumuah"
    }
  ],
  info: [
    {
      id: 6,
      title: "Time to Quit Vaping",
      image: "/lovable-uploads/1b0f1fde-f17a-42d9-bd2b-2c2584d54361.png",
      category: "info"
    },
    {
      id: 7,
      title: "Overnight Programme",
      image: "/lovable-uploads/3a6fc561-7de3-4dcb-a5fd-eacd3f8e5157.png",
      category: "info"
    },
    {
      id: 8,
      title: "Programme of Hazrat Moulana",
      image: "/lovable-uploads/94f8a3b1-ed0a-48d4-905e-767e509e801e.png",
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

  // Function to convert Google Drive URL to thumbnail view
  const convertToThumbnailUrl = (googleDriveUrl: string): string => {
    try {
      console.log('Original URL:', googleDriveUrl);
      
      // If it's already in the correct format, return as is
      if (googleDriveUrl.includes('drive.google.com/uc?export=view&id=')) {
        console.log('URL already in correct format:', googleDriveUrl);
        return googleDriveUrl;
      }
      
      // Extract file ID from various Google Drive URL formats
      let fileId = '';
      
      // Format: https://drive.google.com/file/d/FILE_ID/view?usp=drivesdk
      const match1 = googleDriveUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (match1 && match1[1]) {
        fileId = match1[1];
      }
      
      // Format: https://drive.google.com/open?id=FILE_ID
      const match2 = googleDriveUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (match2 && match2[1]) {
        fileId = match2[1];
      }
      
      if (fileId) {
        const thumbnailUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
        console.log('Converted URL:', thumbnailUrl);
        return thumbnailUrl;
      }
      
      console.log('Could not extract file ID, returning original URL');
      return googleDriveUrl; // Return original if can't parse
    } catch (error) {
      console.error('Error converting Google Drive URL:', error);
      return googleDriveUrl;
    }
  };

  // Fetch data from JSON API
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        console.log('Fetching notices from API...');
        const response = await fetch('https://script.google.com/macros/s/AKfycbxb0c6zf_w39OoFdyCX7Jh1KGTSkj56bQneQeMXdQj2RbyTQTELg96Z7VINuvPNdFd-/exec');
        const data = await response.json();
        
        console.log('Fetched notices data:', data);
        
        // Organize data by category and convert URLs
        const organizedData: {[key: string]: NoticeItem[]} = {
          upcoming: [],
          jumuah: [],
          info: []
        };
        
        data.forEach((item: any, index: number) => {
          const imageUrl = item.imageUrl || item.image || '';
          const convertedImageUrl = convertToThumbnailUrl(imageUrl);
          
          const notice: NoticeItem = {
            id: index + 1,
            title: item.title || `Notice ${index + 1}`,
            image: convertedImageUrl,
            category: item.category || 'upcoming'
          };
          
          console.log('Processing notice:', notice);
          
          // Add to appropriate category, default to 'upcoming' if category doesn't exist
          const category = notice.category.toLowerCase();
          if (organizedData[category]) {
            organizedData[category].push(notice);
          } else {
            organizedData.upcoming.push(notice);
          }
        });
        
        console.log('Organized data:', organizedData);
        setNoticesData(organizedData);
      } catch (error) {
        console.error('Error fetching notices:', error);
        // Keep empty arrays if fetch fails
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

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
    <section className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-800">NOTICES</h2>
        <p className="text-center text-gray-600 mb-8">Stay informed about the latest events, programs, and announcements</p>
        
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-white shadow-sm rounded-full overflow-hidden p-1 w-full max-w-sm">
            {tabs.map(tab => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "ghost"}
                className={`rounded-full px-4 py-2 text-sm flex-1 capitalize ${
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
          <div className="flex justify-center items-center h-80">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
              <p className="text-gray-500 font-medium">Loading notices...</p>
            </div>
          </div>
        )}

        {/* 3D Carousel */}
        {!loading && currentNotices.length > 0 && (
          <div 
            className="relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="relative h-96 flex items-center justify-center" 
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
                    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                      <img
                        src={notice.image}
                        alt={notice.title}
                        className="w-auto h-auto max-w-[300px] max-h-[400px] min-w-[200px] min-h-[250px] object-contain"
                        style={{
                          display: 'block'
                        }}
                        onLoad={() => {
                          console.log('Image loaded successfully:', notice.image);
                        }}
                        onError={(e) => {
                          console.error('Image failed to load:', notice.image);
                          console.error('Error details:', e);
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
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-700 shadow-lg rounded-full p-3 transition-colors hidden md:block"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-700 shadow-lg rounded-full p-3 transition-colors hidden md:block"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            {/* Dots Indicator */}
            {currentNotices.length > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {currentNotices.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
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
          <div className="flex justify-center items-center h-80">
            <div className="text-center">
              <p className="text-gray-500 font-medium">No notices available for {activeTab}</p>
              <p className="text-gray-400 text-sm mt-1">Check back soon for updates</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NoticesSection;
