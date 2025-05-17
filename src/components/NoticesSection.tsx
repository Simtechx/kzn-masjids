
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Image } from 'lucide-react';
import { toast } from 'sonner';

interface NoticeItem {
  No: string;
  "File Name": string;
  Category: string;
  "File Size": string;
  "MIME Type": string;
  URL: string;
}

const NoticesSection = () => {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Define the API URL
  const NOTICES_API_URL = "https://script.google.com/macros/s/AKfycbw4YC4da2e1ZDb_Mx6cHJ8VSNoNFZNKOBSGxhmWxt5vnaGf8aK4ztTuTj5TFcL17MCI/exec";
  
  useEffect(() => {
    fetchNotices();
  }, []);
  
  const fetchNotices = async () => {
    setLoading(true);
    try {
      const response = await fetch(NOTICES_API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch notices');
      }
      
      const data = await response.json();
      console.log("Fetched notices data:", data);
      
      if (data && Array.isArray(data)) {
        // The API is now returning an array directly
        setNotices(data);
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
  
  // Filter notices by active tab
  const filteredNotices = notices.filter(notice => 
    notice.Category?.toLowerCase() === activeTab.toLowerCase()
  );
  
  // Debug image URLs to diagnose what's happening
  const debugImageUrls = filteredNotices.map(notice => {
    console.log(`Notice URL before processing: ${notice.URL}`);
    const processedUrl = getDirectImageUrl(notice.URL);
    console.log(`Notice URL after processing: ${processedUrl}`);
    return processedUrl;
  });
  console.log("Debug image URLs:", debugImageUrls);
  
  // Process the URL to make it properly viewable
  const getDirectImageUrl = (url: string) => {
    if (!url) {
      console.log("URL is empty or undefined");
      return '';
    }
    
    console.log(`Processing URL: ${url}`);
    
    // Check if it's a Google Drive URL
    if (url.includes('drive.google.com/file/d/')) {
      // Extract the file ID
      const fileIdMatch = url.match(/\/d\/([^\/]+)/);
      if (fileIdMatch && fileIdMatch[1]) {
        // Return the direct download URL
        const directUrl = `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
        console.log(`Converted Google Drive URL: ${directUrl}`);
        return directUrl;
      }
    }
    
    // For direct image URLs, return as is
    return url;
  };
  
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
                {filteredNotices.map((notice, index) => (
                  <div key={`notice-${index}`} className="flex flex-col">
                    <div className="relative h-64 rounded-lg overflow-hidden">
                      <img 
                        src={getDirectImageUrl(notice.URL)}
                        alt={notice["File Name"] || `Notice ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg shadow"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          console.error(`Error loading image: ${target.src}`);
                          target.src = "/placeholder.svg";
                          target.alt = "Image not available";
                        }}
                      />
                    </div>
                    <p className="mt-2 text-center text-sm font-medium text-gray-700">
                      {notice["File Name"] || `Notice ${index + 1}`}
                    </p>
                  </div>
                ))}
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
