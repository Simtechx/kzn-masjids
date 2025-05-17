import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Image } from 'lucide-react';
import { toast } from 'sonner';

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
  
  // API URL for notices
  const NOTICES_API_URL = "https://script.google.com/macros/s/AKfycbxb0c6zf_w39OoFdyCX7Jh1KGTSkj56bQneQeMXdQj2RbyTQTELg96Z7VINuvPNdFd-/exec";
  
  // Function to determine category from the file name if Category is not present
  const getCategoryFromFileName = (fileName: string): string => {
    if (!fileName) return 'Info';
    
    const lowerFileName = fileName.toLowerCase();
    
    if (lowerFileName.includes('upcoming')) return 'Upcoming';
    if (lowerFileName.includes('jumuah')) return 'Jumuah';
    return 'Info';
  };
  
  useEffect(() => {
    fetchNotices();
  }, []);
  
  const fetchNotices = async () => {
    setLoading(true);
    try {
      console.log("Fetching notices from:", NOTICES_API_URL);
      const response = await fetch(NOTICES_API_URL);
      
      if (!response.ok) {
        throw new Error('Failed to fetch notices');
      }
      
      const data = await response.json();
      console.log("Fetched notices data:", data);
      
      if (data && Array.isArray(data)) {
        // Process the data to ensure each item has a category
        const processedData = data.map(item => ({
          ...item,
          // Use the Category field if it exists, otherwise determine it from the file name
          Category: item.Category || getCategoryFromFileName(item["File Name"])
        }));
        
        setNotices(processedData);
        console.log("Processed notices data:", processedData);
        toast.success('Notices loaded successfully');
      } else {
        console.error('Invalid notices data format:', data);
        toast.error('Could not load notices data');
        setNotices([]);
      }
    } catch (error) {
      console.error('Error fetching notices:', error);
      toast.error('Failed to load notices');
      setNotices([]);
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
  
  // Log the filtered notices for debugging
  console.log("Filtered notices for tab", activeTab, ":", filteredNotices);
  
  return (
    <section className="py-12 px-4 bg-[#F7F8FA]">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-800">NOTICES</h2>
          <p className="text-center text-gray-600 mb-6">Stay informed about the latest events, programs, and announcements</p>
          
          <div className="flex justify-center mb-6">
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
                  onClick={() => {
                    setActiveTab(tab);
                  }}
                >
                  {tab}
                </Button>
              ))}
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-80 bg-white rounded-lg shadow-md">
              <Loader2 className="h-8 w-8 text-yellow-500 animate-spin" />
            </div>
          ) : filteredNotices.length > 0 ? (
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredNotices.map((notice, index) => {
                  console.log(`Rendering notice ${index}:`, notice);
                  // Use a different approach for images - use a direct img tag with fallback
                  return (
                    <div key={`notice-${index}`} className="flex flex-col">
                      <div className="relative h-64 rounded-lg overflow-hidden">
                        {/* Try different approach for Google Drive images */}
                        <picture>
                          <source srcSet={notice["Image URL"]} type="image/jpeg" />
                          <source srcSet={notice["Image URL"]} type="image/png" />
                          <img 
                            src={notice["Image URL"]}
                            alt={notice["File Name"] || `Notice ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg shadow"
                            loading="lazy"
                            onError={(e) => {
                              // If direct URL fails, try alternative approach for Google Drive
                              const target = e.target as HTMLImageElement;
                              console.error(`Error loading image: ${target.src}`);
                              
                              // Try to extract the file ID from Google Drive URL if present
                              const url = target.src;
                              if (url.includes('drive.google.com') && url.includes('id=')) {
                                // URL already has the correct format, keep it but log the error
                                console.log("Using already formatted Google Drive URL:", url);
                              }
                              
                              // Fallback to placeholder if everything fails
                              if (target.src !== "/placeholder.svg") {
                                target.src = "/placeholder.svg";
                                target.alt = "Image not available";
                              }
                            }}
                          />
                        </picture>
                      </div>
                      <p className="mt-2 text-center text-sm font-medium text-gray-700">
                        {notice["File Name"] || `Notice ${index + 1}`}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-80 bg-white rounded-lg shadow-md">
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
