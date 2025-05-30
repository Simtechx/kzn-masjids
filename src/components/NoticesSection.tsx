import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Image, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { getImageDimensions } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel"

// Updated interface to match the API response format
interface NoticeItem {
  "File Name": string;
  "Image URL": string;
  Category?: string;
}

interface ImageDimensions {
  width: number;
  height: number;
  aspectRatio: number;
}

const NoticesSection = () => {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set());
  const [imageDimensions, setImageDimensions] = useState<Map<string, ImageDimensions>>(new Map());
  const [api, setApi] = useState<CarouselApi>();
  
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
  
  // Function to convert Google Drive URL to direct image URL
  const convertGoogleDriveUrl = (url: string): string => {
    if (!url) return '';
    
    // Extract file ID from various Google Drive URL formats
    let fileId = '';
    
    // Handle uc?export=view format
    if (url.includes('uc?export=view&id=')) {
      fileId = url.split('id=')[1];
    }
    // Handle /file/d/ format
    else if (url.includes('/file/d/')) {
      const match = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
      fileId = match ? match[1] : '';
    }
    // Handle direct ID
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
  
  // Handle image load success and get dimensions
  const handleImageLoad = async (imageUrl: string, index: number) => {
    console.log(`Image loaded successfully: ${imageUrl}`);
    setImageLoadErrors(prev => {
      const newSet = new Set(prev);
      newSet.delete(`${index}-${imageUrl}`);
      return newSet;
    });
    
    // Get image dimensions for dynamic sizing
    try {
      const dimensions = await getImageDimensions(imageUrl);
      setImageDimensions(prev => new Map(prev).set(`${index}-${imageUrl}`, dimensions));
      console.log(`Image dimensions for ${imageUrl}:`, dimensions);
    } catch (error) {
      console.log(`Could not get dimensions for ${imageUrl}`);
    }
  };
  
  // Calculate dynamic height based on image aspect ratio
  const getCardHeight = (imageUrl: string, index: number): string => {
    const imageKey = `${index}-${imageUrl}`;
    const dimensions = imageDimensions.get(imageKey);
    
    if (dimensions) {
      // Base width is 320px for center card, calculate height to maintain aspect ratio
      const baseWidth = 320;
      const calculatedHeight = baseWidth / dimensions.aspectRatio;
      // Clamp height between 240px and 480px for reasonable sizing
      const clampedHeight = Math.max(240, Math.min(480, calculatedHeight));
      return `${clampedHeight}px`;
    }
    
    // Default height if dimensions not loaded
    return '360px';
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
            <div className="relative perspective-1000">
              <Carousel 
                className="w-full max-w-6xl mx-auto" 
                setApi={setApi}
                opts={{
                  align: "center",
                  loop: true,
                }}
              >
                <CarouselContent className="-ml-4">
                  {filteredNotices.map((notice, index) => {
                    const convertedImageUrl = convertGoogleDriveUrl(notice["Image URL"]);
                    const imageKey = `${index}-${convertedImageUrl}`;
                    const hasImageError = imageLoadErrors.has(imageKey);
                    const cardHeight = getCardHeight(convertedImageUrl, index);
                    
                    return (
                      <CarouselItem key={`notice-${index}`} className="pl-4 basis-4/5 md:basis-2/5 lg:basis-1/3">
                        <div className="group perspective-1000">
                          <div 
                            className="relative overflow-hidden rounded-xl bg-white shadow-2xl transition-all duration-700 transform-gpu hover:scale-105 hover:shadow-3xl"
                            style={{ height: cardHeight }}
                          >
                            {convertedImageUrl && !hasImageError ? (
                              <img
                                src={convertedImageUrl}
                                alt={notice["File Name"] || `Notice ${index + 1}`}
                                className="w-full h-full object-cover"
                                onLoad={() => handleImageLoad(convertedImageUrl, index)}
                                onError={() => handleImageError(convertedImageUrl, index)}
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-gradient-to-br from-gray-50 to-gray-100">
                                <div className="bg-yellow-100 p-4 rounded-full mb-4">
                                  <Image className="h-8 w-8 text-yellow-600" />
                                </div>
                                <p className="text-gray-600 text-sm mb-3 font-medium">
                                  {hasImageError ? 'Image preview unavailable' : 'Loading image...'}
                                </p>
                                <a
                                  href={notice["Image URL"]}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 text-xs font-medium bg-yellow-50 px-3 py-1 rounded-full transition-colors"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                  View Full Notice
                                </a>
                              </div>
                            )}
                            
                            {/* Dark gradient overlay for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            
                            {/* Title overlay at bottom with improved styling */}
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                              <h3 className="text-white font-bold text-lg leading-tight mb-3 drop-shadow-lg">
                                {notice["File Name"] || `Notice ${index + 1}`}
                              </h3>
                              <span className="inline-block bg-yellow-500 text-black text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">
                                {notice.Category || 'Notice'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-12 bg-white hover:bg-yellow-50 border-yellow-200 text-yellow-600 shadow-lg" />
                <CarouselNext className="hidden md:flex -right-12 bg-white hover:bg-yellow-50 border-yellow-200 text-yellow-600 shadow-lg" />
              </Carousel>
              
              {/* Mobile navigation buttons */}
              <div className="flex justify-center mt-6 md:hidden space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white border-yellow-200 text-yellow-600 hover:bg-yellow-50"
                  onClick={() => api?.scrollPrev()}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white border-yellow-200 text-yellow-600 hover:bg-yellow-50"
                  onClick={() => api?.scrollNext()}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
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
