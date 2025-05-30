import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Image, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

// Updated interface to match the API response format
interface NoticeItem {
  "File Name": string;
  "Image URL": string;
  Category?: string;
}

const NoticesSection = () => {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set());
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Touch handling refs
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // API URL for notices
  const NOTICES_API_URL = "https://script.google.com/macros/s/AKfycbxb0c6zf_w39OoFdyCX7Jh1KGTSkj56bQneQeMXdQj2RbyTQTELg96Z7VINuvPNdFd-/exec";
  
  // Updated Islamic fallback images with nature and architectural scenes
  const fallbackNotices: NoticeItem[] = [
    // Upcoming Events
    {
      "File Name": "Community Event - Join Us for Special Gathering",
      "Image URL": "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=800",
      "Category": "Upcoming"
    },
    {
      "File Name": "Islamic Education Workshop - Learn & Grow",
      "Image URL": "https://images.unsplash.com/photo-1564769625392-651b7c831e21?auto=format&fit=crop&q=80&w=800",
      "Category": "Upcoming"
    },
    {
      "File Name": "Youth Conference - Building Tomorrow's Leaders",
      "Image URL": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=800",
      "Category": "Upcoming"
    },
    // Jumuah
    {
      "File Name": "Jumuah Prayer Schedule - Updated Timings",
      "Image URL": "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80&w=800",
      "Category": "Jumuah"
    },
    {
      "File Name": "Special Jumuah Khutbah Series",
      "Image URL": "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&q=80&w=800",
      "Category": "Jumuah"
    },
    {
      "File Name": "Community Jumuah Gathering",
      "Image URL": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=800",
      "Category": "Jumuah"
    },
    // Info
    {
      "File Name": "Masjid Guidelines and Community Information",
      "Image URL": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800",
      "Category": "Info"
    },
    {
      "File Name": "Community Support Programs Available",
      "Image URL": "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=800",
      "Category": "Info"
    },
    {
      "File Name": "Volunteer Opportunities - Get Involved",
      "Image URL": "https://images.unsplash.com/photo-1564769625392-651b7c831e21?auto=format&fit=crop&q=80&w=800",
      "Category": "Info"
    }
  ];
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Function to convert Google Drive URL to direct image URL
  const convertGoogleDriveUrl = (url: string): string => {
    if (!url) return '';
    
    let fileId = '';
    
    if (url.includes('uc?export=view&id=')) {
      fileId = url.split('id=')[1];
    }
    else if (url.includes('/file/d/')) {
      const match = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
      fileId = match ? match[1] : '';
    }
    else if (url.match(/^[a-zA-Z0-9-_]+$/)) {
      fileId = url;
    }
    
    if (fileId) {
      const convertedUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
      console.log(`Converting Google Drive URL: ${url} -> ${convertedUrl}`);
      return convertedUrl;
    }
    
    console.log(`Could not extract file ID from: ${url}`);
    return url;
  };
  
  // Function to determine category from the file name if Category is not present
  const getCategoryFromFileName = (fileName: string): string => {
    if (!fileName) return 'Info';
    
    const lowerFileName = fileName.toLowerCase();
    
    if (lowerFileName.includes('upcoming')) return 'Upcoming';
    if (lowerFileName.includes('jumuah')) return 'Jumuah';
    return 'Info';
  };
  
  // Handle image load error
  const handleImageError = (imageUrl: string, index: number) => {
    console.log(`Image failed to load: ${imageUrl}`);
    setImageLoadErrors(prev => new Set(prev).add(`${index}-${imageUrl}`));
  };
  
  // Handle image load success
  const handleImageLoad = (imageUrl: string, index: number) => {
    console.log(`Image loaded successfully: ${imageUrl}`);
    setImageLoadErrors(prev => {
      const newSet = new Set(prev);
      newSet.delete(`${index}-${imageUrl}`);
      return newSet;
    });
  };
  
  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe && filteredNotices.length > 0) {
      nextSlide();
    }
    if (isRightSwipe && filteredNotices.length > 0) {
      prevSlide();
    }
  };
  
  useEffect(() => {
    fetchNotices();
  }, []);
  
  const fetchNotices = async () => {
    setLoading(true);
    setApiError(false);
    
    try {
      console.log("Fetching notices from:", NOTICES_API_URL);
      const response = await fetch(NOTICES_API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Fetched notices data:", data);
      
      if (data && Array.isArray(data)) {
        const processedData = data.map(item => ({
          ...item,
          Category: item.Category || getCategoryFromFileName(item["File Name"])
        }));
        
        setNotices(processedData);
        console.log("Processed notices data:", processedData);
        toast.success('Notices loaded successfully');
      } else {
        throw new Error('Invalid notices data format');
      }
    } catch (error) {
      console.error('Error fetching notices:', error);
      setApiError(true);
      
      console.log('Using fallback notices data');
      setNotices(fallbackNotices);
      toast.error('Using sample notices data');
    } finally {
      setLoading(false);
    }
  };
  
  const tabs = ['Upcoming', 'Jumuah', 'Info'];
  
  // Filter notices by active tab
  const filteredNotices = notices.filter(notice => {
    const noticeCategory = notice.Category || '';
    return noticeCategory.toLowerCase() === activeTab.toLowerCase();
  });
  
  // Reset current slide when tab changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [activeTab]);
  
  // Auto-slide functionality
  useEffect(() => {
    if (filteredNotices.length <= 1 || isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % filteredNotices.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [filteredNotices.length, isPaused]);
  
  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredNotices.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredNotices.length) % filteredNotices.length);
  };
  
  console.log("Filtered notices for tab", activeTab, ":", filteredNotices);
  
  return (
    <section className="py-12 px-4 bg-[#F7F8FA]">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-800">NOTICES</h2>
          <p className="text-center text-gray-600 mb-6">Stay informed about the latest events, programs, and announcements</p>
          
          {apiError && (
            <div className="mb-4 p-3 bg-[#064e3b] border border-[#065f46] rounded-lg">
              <p className="text-white text-sm text-center font-medium">
                Notices will be updated Soon
              </p>
            </div>
          )}
          
          {/* Mobile-optimized tabs */}
          <div className="flex justify-center mb-8 px-2">
            <div className="flex bg-white shadow-sm rounded-full overflow-hidden p-1 w-full max-w-sm">
              {tabs.map(tab => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? "default" : "ghost"}
                  className={`rounded-full px-4 py-2 text-sm flex-1 min-w-0 ${
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
          
          {loading ? (
            <div className="flex justify-center items-center h-96 bg-white rounded-lg shadow-md">
              <Loader2 className="h-8 w-8 text-yellow-500 animate-spin" />
            </div>
          ) : filteredNotices.length > 0 ? (
            <div className="relative">
              {/* Apple-style Overlapping Cards Carousel */}
              <div 
                ref={carouselRef}
                className="relative h-96 flex items-center justify-center overflow-hidden"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {filteredNotices.map((notice, index) => {
                  const convertedImageUrl = convertGoogleDriveUrl(notice["Image URL"]);
                  const imageKey = `${index}-${convertedImageUrl}`;
                  const hasImageError = imageLoadErrors.has(imageKey);
                  
                  // Calculate position relative to current slide
                  const position = (index - currentSlide + filteredNotices.length) % filteredNotices.length;
                  const isCurrent = position === 0;
                  const isNext = position === 1;
                  const isPrev = position === filteredNotices.length - 1;
                  const isVisible = isCurrent || isNext || isPrev;
                  
                  // Apple-style positioning and styling
                  let transform = 'translateX(-50%) scale(0.8)';
                  let zIndex = 1;
                  let opacity = 0.6;
                  
                  if (isCurrent) {
                    transform = 'translateX(-50%) scale(1)';
                    zIndex = 3;
                    opacity = 1;
                  } else if (isNext) {
                    transform = 'translateX(20%) scale(0.85)';
                    zIndex = 2;
                    opacity = 0.7;
                  } else if (isPrev) {
                    transform = 'translateX(-120%) scale(0.85)';
                    zIndex = 2;
                    opacity = 0.7;
                  }
                  
                  return (
                    <div
                      key={`notice-${index}`}
                      className={`absolute left-1/2 transition-all duration-500 ease-out ${
                        isVisible ? 'pointer-events-auto' : 'pointer-events-none'
                      }`}
                      style={{
                        transform,
                        zIndex,
                        opacity: isVisible ? opacity : 0,
                        width: '320px',
                        height: '300px'
                      }}
                    >
                      {convertedImageUrl && !hasImageError ? (
                        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden h-full">
                          <img
                            src={convertedImageUrl}
                            alt={notice["File Name"] || `Notice ${index + 1}`}
                            className="w-full h-full object-cover"
                            onLoad={() => handleImageLoad(convertedImageUrl, index)}
                            onError={() => handleImageError(convertedImageUrl, index)}
                          />
                          
                          {/* Title overlay */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                            <h3 className="text-white font-bold text-sm mb-2 line-clamp-2">
                              {notice["File Name"] || `Notice ${index + 1}`}
                            </h3>
                            <span className="inline-block bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                              {notice.Category || 'Notice'}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-white rounded-2xl shadow-2xl">
                          <div className="bg-yellow-100 p-3 rounded-full mb-3">
                            <Image className="h-6 w-6 text-yellow-600" />
                          </div>
                          <p className="text-gray-600 text-xs mb-2 font-medium">
                            {hasImageError ? 'Image preview unavailable' : 'Loading image...'}
                          </p>
                          <a
                            href={notice["Image URL"]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-yellow-600 hover:text-yellow-700 text-xs font-medium bg-yellow-50 px-2 py-1 rounded-full transition-colors"
                          >
                            <ExternalLink className="h-3 w-3" />
                            View Notice
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
                
                {/* Navigation Buttons - Hidden on mobile */}
                {filteredNotices.length > 1 && !isMobile && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-white hover:bg-yellow-50 border border-yellow-200 text-yellow-600 shadow-lg rounded-full p-3 transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-white hover:bg-yellow-50 border border-yellow-200 text-yellow-600 shadow-lg rounded-full p-3 transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
              
              {/* Dots Indicator */}
              {filteredNotices.length > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                  {filteredNotices.map((_, index) => (
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
              
              {/* Mobile swipe hint */}
              {isMobile && filteredNotices.length > 1 && (
                <div className="text-center mt-4">
                  <p className="text-gray-500 text-sm">Swipe left or right to navigate</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-center items-center h-96 bg-white rounded-lg shadow-md">
              <div className="text-center">
                <div className="bg-yellow-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Image className="h-8 w-8 text-yellow-600" />
                </div>
                <p className="text-gray-500 font-medium">No notices available for {activeTab}</p>
                <p className="text-gray-400 text-sm mt-1">Check back soon for updates</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NoticesSection;
