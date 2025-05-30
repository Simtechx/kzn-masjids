
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

interface NoticeItem {
  "File Name": string;
  "Image URL": string;
  Category?: string;
}

const NoticesSection = () => {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const NOTICES_API_URL = "https://script.google.com/macros/s/AKfycbxb0c6zf_w39OoFdyCX7Jh1KGTSkj56bQneQeMXdQj2RbyTQTELg96Z7VINuvPNdFd-/exec";

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const response = await fetch(NOTICES_API_URL);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      if (data && Array.isArray(data)) {
        setNotices(data);
        toast.success('Notices loaded successfully');
      } else {
        throw new Error('Invalid notices data format');
      }
    } catch (error) {
      console.error('Error fetching notices:', error);
      toast.error('Failed to load notices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const tabs = ['Upcoming', 'Jumuah', 'Info'];
  const filteredNotices = notices.filter(notice => 
    (notice.Category || '').toLowerCase() === activeTab.toLowerCase()
  );

  useEffect(() => {
    setCurrentSlide(0);
  }, [activeTab]);

  useEffect(() => {
    if (filteredNotices.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % filteredNotices.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [filteredNotices.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % filteredNotices.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + filteredNotices.length) % filteredNotices.length);

  const convertGoogleDriveUrl = (url: string): string => {
    if (!url) return '';
    
    let fileId = '';
    if (url.includes('uc?export=view&id=')) {
      fileId = url.split('id=')[1];
    } else if (url.includes('/file/d/')) {
      const match = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
      fileId = match ? match[1] : '';
    } else if (url.match(/^[a-zA-Z0-9-_]+$/)) {
      fileId = url;
    }
    
    return fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w800` : url;
  };

  return (
    <section className="py-12 px-4 bg-[#F7F8FA]">
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
                className={`rounded-full px-4 py-2 text-sm flex-1 ${
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
          <div className="flex justify-center items-center h-96">
            <Loader2 className="h-8 w-8 text-yellow-500 animate-spin" />
          </div>
        ) : filteredNotices.length > 0 ? (
          <div className="relative">
            {/* 3D Carousel */}
            <div className="relative h-96 flex items-center justify-center" style={{ perspective: '1000px' }}>
              {filteredNotices.map((notice, index) => {
                const offset = (index - currentSlide + filteredNotices.length) % filteredNotices.length;
                const isCenter = offset === 0;
                const isNext = offset === 1;
                const isPrev = offset === filteredNotices.length - 1;
                
                let transform = 'translateX(-50%)';
                let zIndex = 1;
                let opacity = 0.3;
                let scale = 0.7;
                
                if (isCenter) {
                  transform = 'translateX(-50%) translateZ(0px) rotateY(0deg)';
                  zIndex = 30;
                  opacity = 1;
                  scale = 1;
                } else if (isNext) {
                  transform = 'translateX(-10%) translateZ(-150px) rotateY(-35deg)';
                  zIndex = 20;
                  opacity = 0.7;
                  scale = 0.85;
                } else if (isPrev) {
                  transform = 'translateX(-90%) translateZ(-150px) rotateY(35deg)';
                  zIndex = 20;
                  opacity = 0.7;
                  scale = 0.85;
                }
                
                const convertedImageUrl = convertGoogleDriveUrl(notice["Image URL"]);
                
                return (
                  <div
                    key={index}
                    className="absolute left-1/2 w-80 h-72 transition-all duration-700 ease-in-out cursor-pointer"
                    style={{
                      transform: `${transform} scale(${scale})`,
                      zIndex,
                      opacity
                    }}
                    onClick={() => setCurrentSlide(index)}
                  >
                    <div className="w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden">
                      {convertedImageUrl ? (
                        <div className="relative w-full h-full">
                          <img
                            src={convertedImageUrl}
                            alt={notice["File Name"]}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                            <h3 className="text-white font-bold text-sm mb-2 line-clamp-2">
                              {notice["File Name"]}
                            </h3>
                            <span className="inline-block bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                              {notice.Category || 'Notice'}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                          <div className="bg-yellow-100 p-3 rounded-full mb-3">
                            <div className="h-6 w-6 bg-yellow-600 rounded"></div>
                          </div>
                          <p className="text-gray-600 text-sm">{notice["File Name"]}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              
              {/* Navigation Arrows */}
              {filteredNotices.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-white hover:bg-yellow-50 border border-yellow-200 text-yellow-600 shadow-lg rounded-full p-3 transition-colors hidden md:block"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-white hover:bg-yellow-50 border border-yellow-200 text-yellow-600 shadow-lg rounded-full p-3 transition-colors hidden md:block"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
            
            {/* Dots Indicator */}
            {filteredNotices.length > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
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
          </div>
        ) : (
          <div className="flex justify-center items-center h-96">
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
