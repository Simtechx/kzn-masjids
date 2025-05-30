import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Image, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// Updated interface to match the API response format
interface NoticeItem {
  "File Name": string;
  "Image URL": string;
  Category?: string; // Optional since we'll have a fallback
}

const NoticesSection = () => {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set());
  
  // API URL for notices
  const NOTICES_API_URL = "https://script.google.com/macros/s/AKfycbxb0c6zf_w39OoFdyCX7Jh1KGTSkj56bQneQeMXdQj2RbyTQTELg96Z7VINuvPNdFd-/exec";
  
  // Fallback data for testing when API is down
  const fallbackNotices: NoticeItem[] = [
    {
      "File Name": "Upcoming Event - Community Iftar",
      "Image URL": "https://drive.google.com/uc?export=view&id=1kG0JdM57LIikUrTOa-7l67u6ila9T7Mg",
      "Category": "Upcoming"
    },
    {
      "File Name": "Jumuah Prayer Schedule",
      "Image URL": "https://drive.google.com/uc?export=view&id=1kG0JdM57LIikUrTOa-7l67u6ila9T7Mg",
      "Category": "Jumuah"
    },
    {
      "File Name": "Community Information Notice",
      "Image URL": "https://drive.google.com/uc?export=view&id=1kG0JdM57LIikUrTOa-7l67u6ila9T7Mg",
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
      // Use the thumbnail format which is more reliable for display
      const convertedUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`;
      console.log(`Converting URL: ${url} -> ${convertedUrl}`);
      return convertedUrl;
    }
    
    console.log(`Could not extract file ID from: ${url}`);
    return url; // Return original if can't convert
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
        // Process the data to ensure each item has a category
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
      
      // Use fallback data when API fails
      console.log('Using fallback notices data');
      setNotices(fallbackNotices);
      toast.error('API failed - showing sample notices');
    } finally {
      setLoading(false);
    }
  };
  
  const tabs = ['Upcoming', 'Jumuah', 'Info'];
  
  // Filter notices by active tab - case insensitive comparison
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
            <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded-lg">
              <p className="text-yellow-800 text-sm text-center">
                API temporarily unavailable - showing sample notices
              </p>
            </div>
          )}
          
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2 bg-white shadow-sm rounded-full overflow-x-auto p-1">
              {tabs.map(tab => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? "default" : "ghost"}
                  className={`rounded-full px-6 ${
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
              <Carousel className="w-full max-w-5xl mx-auto">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {filteredNotices.map((notice, index) => {
                    const convertedImageUrl = convertGoogleDriveUrl(notice["Image URL"]);
                    const imageKey = `${index}-${convertedImageUrl}`;
                    const hasImageError = imageLoadErrors.has(imageKey);
                    
                    console.log(`Rendering notice ${index}:`, notice);
                    console.log(`Converted image URL:`, convertedImageUrl);
                    
                    return (
                      <CarouselItem key={`notice-${index}`} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
                          <div className="relative aspect-[3/4] bg-gray-100">
                            {convertedImageUrl && !hasImageError ? (
                              <img
                                src={convertedImageUrl}
                                alt={notice["File Name"] || `Notice ${index + 1}`}
                                className="w-full h-full object-cover"
                                onLoad={() => handleImageLoad(convertedImageUrl, index)}
                                onError={() => handleImageError(convertedImageUrl, index)}
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                                <Image className="h-12 w-12 text-gray-400 mb-2" />
                                <p className="text-gray-500 text-sm mb-2">
                                  {hasImageError ? 'Image failed to load' : 'Loading image...'}
                                </p>
                                <a
                                  href={notice["Image URL"]}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 hover:text-blue-700 text-xs flex items-center gap-1"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                  View Original
                                </a>
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="text-sm font-medium text-gray-800 text-center line-clamp-2">
                              {notice["File Name"] || `Notice ${index + 1}`}
                            </h3>
                          </div>
                        </div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-12 bg-white hover:bg-gray-50 border-gray-200" />
                <CarouselNext className="hidden md:flex -right-12 bg-white hover:bg-gray-50 border-gray-200" />
              </Carousel>
              
              {/* Mobile navigation buttons */}
              <div className="flex justify-center mt-4 md:hidden space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white"
                  onClick={() => document.querySelector('[data-carousel-prev]')?.click()}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white"
                  onClick={() => document.querySelector('[data-carousel-next]')?.click()}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-96 bg-white rounded-lg shadow-md">
              <div className="text-center">
                <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No notices available for {activeTab}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NoticesSection;
