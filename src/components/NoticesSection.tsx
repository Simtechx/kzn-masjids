
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
  const [apiError, setApiError] = useState(false);
  
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
  
  // Function to validate Google Drive URL format
  const validateGoogleDriveUrl = (url: string): boolean => {
    if (!url) return false;
    
    // Check if it's a proper Google Drive viewable URL
    const isGoogleDriveViewUrl = url.includes('drive.google.com/uc?export=view&id=');
    
    console.log(`Validating URL: ${url} - Valid: ${isGoogleDriveViewUrl}`);
    
    return isGoogleDriveViewUrl;
  };
  
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
        // Process the data to ensure each item has a category and validate URLs
        const processedData = data.map(item => {
          const processedItem = {
            ...item,
            // Use the Category field if it exists, otherwise determine it from the file name
            Category: item.Category || getCategoryFromFileName(item["File Name"])
          };
          
          // Log URL validation for each item
          const isValidUrl = validateGoogleDriveUrl(item["Image URL"]);
          console.log(`Notice "${item["File Name"]}" - URL valid: ${isValidUrl}, URL: ${item["Image URL"]}`);
          
          return processedItem;
        });
        
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
  
  // Log the filtered notices for debugging
  console.log("Filtered notices for tab", activeTab, ":", filteredNotices);
  
  return (
    <section className="py-12 px-4 bg-[#F7F8FA]">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-800">NOTICES</h2>
          <p className="text-center text-gray-600 mb-6">Stay informed about the latest events, programs, and announcements</p>
          
          {apiError && (
            <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded-lg">
              <p className="text-yellow-800 text-sm text-center">
                API temporarily unavailable - showing sample notices
              </p>
            </div>
          )}
          
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
                  
                  return (
                    <div key={`notice-${index}`} className="flex flex-col">
                      <div className="relative h-64 rounded-lg overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-4">
                        {notice["Image URL"] ? (
                          <>
                            <Image className="h-16 w-16 text-gray-400 mb-2" />
                            <p className="text-gray-500 text-sm text-center mb-2">Image Loading...</p>
                            <p className="text-xs text-gray-400 break-all">{notice["Image URL"]}</p>
                          </>
                        ) : (
                          <>
                            <Image className="h-16 w-16 text-gray-400 mb-2" />
                            <p className="text-gray-500 text-sm">No Image Available</p>
                          </>
                        )}
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
