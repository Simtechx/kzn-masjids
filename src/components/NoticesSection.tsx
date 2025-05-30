
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
  CarouselApi,
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
  const [api, setApi] = useState<CarouselApi>();
  
  // API URL for notices
  const NOTICES_API_URL = "https://script.google.com/macros/s/AKfycbxb0c6zf_w39OoFdyCX7Jh1KGTSkj56bQneQeMXdQj2RbyTQTELg96Z7VINuvPNdFd-/exec";
  
  // Enhanced fallback data with 3 images per category
  const fallbackNotices: NoticeItem[] = [
    // Upcoming Events
    {
      "File Name": "Community Iftar - Ramadan 2024",
      "Image URL": "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80",
      "Category": "Upcoming"
    },
    {
      "File Name": "Islamic Education Workshop",
      "Image URL": "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80",
      "Category": "Upcoming"
    },
    {
      "File Name": "Youth Islamic Conference 2024",
      "Image URL": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80",
      "Category": "Upcoming"
    },
    // Jumuah
    {
      "File Name": "Jumuah Prayer Schedule - Updated",
      "Image URL": "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80",
      "Category": "Jumuah"
    },
    {
      "File Name": "Special Jumuah Khutbah Series",
      "Image URL": "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80",
      "Category": "Jumuah"
    },
    {
      "File Name": "Jumuah Community Gathering",
      "Image URL": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80",
      "Category": "Jumuah"
    },
    // Info
    {
      "File Name": "Masjid Guidelines and Information",
      "Image URL": "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80",
      "Category": "Info"
    },
    {
      "File Name": "Community Support Programs",
      "Image URL": "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80",
      "Category": "Info"
    },
    {
      "File Name": "Volunteer Opportunities Available",
      "Image URL": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80",
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
      toast.error('Using sample notices data');
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
            <div className="mb-4 p-3 bg-teal-100 border border-teal-400 rounded-lg">
              <p className="text-teal-800 text-sm text-center font-medium">
                Notices will be updated Soon
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
              <Carousel className="w-full max-w-5xl mx-auto" setApi={setApi}>
                <CarouselContent className="-ml-2 md:-ml-4">
                  {filteredNotices.map((notice, index) => {
                    const convertedImageUrl = convertGoogleDriveUrl(notice["Image URL"]);
                    const imageKey = `${index}-${convertedImageUrl}`;
                    const hasImageError = imageLoadErrors.has(imageKey);
                    
                    console.log(`Rendering notice ${index}:`, notice);
                    console.log(`Converted image URL:`, convertedImageUrl);
                    
                    return (
                      <CarouselItem key={`notice-${index}`} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                        <div className="group cursor-pointer">
                          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-teal-200">
                            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100">
                              {convertedImageUrl && !hasImageError ? (
                                <img
                                  src={convertedImageUrl}
                                  alt={notice["File Name"] || `Notice ${index + 1}`}
                                  className="w-full h-auto object-contain max-h-80 group-hover:scale-105 transition-transform duration-300"
                                  onLoad={() => handleImageLoad(convertedImageUrl, index)}
                                  onError={() => handleImageError(convertedImageUrl, index)}
                                />
                              ) : (
                                <div className="flex flex-col items-center justify-center h-48 p-6 text-center">
                                  <div className="bg-teal-100 p-4 rounded-full mb-4">
                                    <Image className="h-8 w-8 text-teal-600" />
                                  </div>
                                  <p className="text-gray-600 text-sm mb-3 font-medium">
                                    {hasImageError ? 'Image preview unavailable' : 'Loading image...'}
                                  </p>
                                  <a
                                    href={notice["Image URL"]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 text-xs font-medium bg-teal-50 px-3 py-1 rounded-full transition-colors"
                                  >
                                    <ExternalLink className="h-3 w-3" />
                                    View Full Notice
                                  </a>
                                </div>
                              )}
                            </div>
                            <div className="p-4">
                              <h3 className="text-sm font-semibold text-gray-800 text-center leading-tight line-clamp-2 group-hover:text-teal-700 transition-colors">
                                {notice["File Name"] || `Notice ${index + 1}`}
                              </h3>
                              <div className="mt-2 text-center">
                                <span className="inline-block bg-teal-100 text-teal-700 text-xs px-2 py-1 rounded-full font-medium">
                                  {notice.Category || 'Notice'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-12 bg-white hover:bg-teal-50 border-teal-200 text-teal-600" />
                <CarouselNext className="hidden md:flex -right-12 bg-white hover:bg-teal-50 border-teal-200 text-teal-600" />
              </Carousel>
              
              {/* Mobile navigation buttons */}
              <div className="flex justify-center mt-6 md:hidden space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white border-teal-200 text-teal-600 hover:bg-teal-50"
                  onClick={() => api?.scrollPrev()}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white border-teal-200 text-teal-600 hover:bg-teal-50"
                  onClick={() => api?.scrollNext()}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-96 bg-white rounded-lg shadow-md">
              <div className="text-center">
                <div className="bg-teal-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Image className="h-8 w-8 text-teal-600" />
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
