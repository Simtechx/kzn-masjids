
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface NoticeItem {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
}

const NoticesSection = () => {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  
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
      
      if (data && Array.isArray(data.notices)) {
        setNotices(data.notices.map((item: any, index: number) => ({
          id: `notice-${index}`,
          title: item.title || `Notice ${index + 1}`,
          imageUrl: item.imageUrl || '',
          category: item.category || 'Upcoming'
        })));
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
    notice.category.toLowerCase() === activeTab.toLowerCase()
  );
  
  // Navigation function for carousel
  const navigate = (direction: 'prev' | 'next') => {
    if (filteredNotices.length === 0) return;
    
    if (direction === 'prev') {
      setCurrentIndex(prev => 
        prev === 0 ? filteredNotices.length - 1 : prev - 1
      );
    } else {
      setCurrentIndex(prev => 
        prev === filteredNotices.length - 1 ? 0 : prev + 1
      );
    }
  };
  
  return (
    <section className="py-12 px-4 bg-[#F7F8FA]">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">Latest Notices & Announcements</h2>
          
          <div className="flex justify-center mb-6">
            <div className="flex space-x-2 bg-white shadow-sm rounded-full overflow-x-auto p-1">
              {tabs.map(tab => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? "default" : "ghost"}
                  className={`rounded-full px-6 ${
                    activeTab === tab 
                      ? 'bg-yellow-500 text-black' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  onClick={() => {
                    setActiveTab(tab);
                    setCurrentIndex(0); // Reset index when tab changes
                  }}
                >
                  {tab}
                </Button>
              ))}
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-80 bg-white rounded-lg shadow-md">
              <Loader2 className="h-8 w-8 text-teal-500 animate-spin" />
            </div>
          ) : filteredNotices.length > 0 ? (
            <div className="relative bg-white rounded-lg shadow-md">
              <div className="relative h-80 md:h-96 overflow-hidden rounded-t-lg">
                {filteredNotices[currentIndex]?.imageUrl ? (
                  <img 
                    src={filteredNotices[currentIndex].imageUrl}
                    alt={filteredNotices[currentIndex].title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      console.error(`Error loading image: ${target.src}`);
                      target.src = "/placeholder.svg";
                      target.alt = "Image not available";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <p className="text-gray-500">No image available</p>
                  </div>
                )}
                
                {/* Navigation arrows */}
                <button 
                  onClick={() => navigate('prev')}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 focus:outline-none"
                  aria-label="Previous notice"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={() => navigate('next')}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 focus:outline-none"
                  aria-label="Next notice"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {/* Page indicator */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                  {filteredNotices.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full focus:outline-none ${
                        currentIndex === index ? 'bg-white' : 'bg-white/50'
                      }`}
                      aria-label={`Go to notice ${index + 1}`}
                    ></button>
                  ))}
                </div>
              </div>
              
              {/* Notice info */}
              <div className="p-4 text-center">
                <h3 className="font-bold text-lg text-gray-800">
                  {filteredNotices[currentIndex]?.title || 'Notice Title'}
                </h3>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-80 bg-white rounded-lg shadow-md">
              <p className="text-gray-500">No notices available for {activeTab}</p>
            </div>
          )}
          
        </div>
      </div>
    </section>
  );
};

export default NoticesSection;
