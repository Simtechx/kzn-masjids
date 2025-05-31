
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NoticeItem {
  id: number;
  title: string;
  image: string;
  category: string;
}

// Mock data - replace with your JSON file
const mockNotices = {
  upcoming: [
    {
      id: 1,
      title: "Eid Celebration 2024",
      image: "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?auto=format&fit=crop&q=80&w=800",
      category: "upcoming"
    },
    {
      id: 2,
      title: "Community Iftar",
      image: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&q=80&w=800",
      category: "upcoming"
    },
    {
      id: 3,
      title: "Quran Classes",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
      category: "upcoming"
    }
  ],
  jumuah: [
    {
      id: 4,
      title: "Friday Prayer 1:30 PM",
      image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&q=80&w=800",
      category: "jumuah"
    },
    {
      id: 5,
      title: "Special Jumuah Program",
      image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=800",
      category: "jumuah"
    }
  ],
  info: [
    {
      id: 6,
      title: "Prayer Times Updated",
      image: "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?auto=format&fit=crop&q=80&w=800",
      category: "info"
    },
    {
      id: 7,
      title: "New Programs Available",
      image: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&q=80&w=800",
      category: "info"
    }
  ]
};

const NoticesSection = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [currentSlide, setCurrentSlide] = useState(0);

  const tabs = ['upcoming', 'jumuah', 'info'];
  const currentNotices = mockNotices[activeTab as keyof typeof mockNotices] || [];

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

        {/* 3D Carousel */}
        {currentNotices.length > 0 && (
          <div className="relative">
            <div className="relative h-80 flex items-center justify-center" style={{ perspective: '1200px' }}>
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
                    className="absolute left-1/2 w-72 h-64 transition-all duration-700 ease-out cursor-pointer"
                    style={{
                      transform,
                      zIndex,
                      opacity
                    }}
                    onClick={() => setCurrentSlide(index)}
                  >
                    <div className="w-full h-full bg-white rounded-xl shadow-xl overflow-hidden">
                      <div className="relative w-full h-full">
                        <img
                          src={notice.image}
                          alt={notice.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <h3 className="text-white font-bold text-lg mb-2">
                            {notice.title}
                          </h3>
                          <span className="inline-block bg-yellow-500 text-black text-xs px-3 py-1 rounded-full font-bold capitalize">
                            {notice.category}
                          </span>
                        </div>
                      </div>
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

        {currentNotices.length === 0 && (
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
