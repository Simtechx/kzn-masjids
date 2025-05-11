
import React, { useState } from 'react';
import { Carousel } from '@/components/ui/carousel';
import { CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NoticesSection = () => {
  // Tab state
  const [activeTab, setActiveTab] = useState("upcoming");

  // Sample notice data with images for each category
  const noticesByCategory = {
    upcoming: [
      {
        id: 1,
        title: 'Overnight Programme of Hazrat Mufti',
        imageUrl: 'https://images.unsplash.com/photo-1466442929976-97f336a657be',
      },
      {
        id: 2,
        title: 'Programme at Musjid Fatimah',
        imageUrl: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb',
      },
      {
        id: 3,
        title: 'Programme of Hazrat Moulana Muhammad Ilyas Patel',
        imageUrl: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
      },
    ],
    jumuah: [
      {
        id: 4,
        title: 'Jumuah at Westville Masjid',
        imageUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
      },
      {
        id: 5,
        title: 'Jumuah Talk at Grey Street Masjid',
        imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      },
      {
        id: 6,
        title: 'Special Jumuah Programme',
        imageUrl: 'https://images.unsplash.com/photo-1560264234-b5618a0bfb0c',
      },
    ],
    times: [
      {
        id: 7,
        title: 'Updated Salaah Times for Winter',
        imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149',
      },
      {
        id: 8,
        title: 'Taraweeh Times Announcement',
        imageUrl: 'https://images.unsplash.com/photo-1551038247-3d9af20df552',
      },
      {
        id: 9,
        title: 'New Fajr Time Schedule',
        imageUrl: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e',
      },
    ],
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-center text-3xl font-bold mb-2 text-teal-800">
          NOTICES
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
          Stay informed about the latest events, programs, and announcements
        </p>
        
        <Tabs defaultValue="upcoming" onValueChange={setActiveTab} className="w-full max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-100">
              <TabsTrigger 
                value="upcoming"
                className={activeTab === "upcoming" ? "bg-yellow-400 text-black" : ""}
              >
                Upcoming
              </TabsTrigger>
              <TabsTrigger 
                value="jumuah"
                className={activeTab === "jumuah" ? "bg-yellow-400 text-black" : ""}
              >
                Jumuah
              </TabsTrigger>
              <TabsTrigger 
                value="times"
                className={activeTab === "times" ? "bg-yellow-400 text-black" : ""}
              >
                Times
              </TabsTrigger>
            </TabsList>
          </div>
          
          {Object.keys(noticesByCategory).map((category) => (
            <TabsContent key={category} value={category} className="focus-visible:outline-none focus-visible:ring-0">
              <div className="relative">
                <Carousel
                  opts={{
                    align: "center",
                    loop: true,
                    dragFree: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {noticesByCategory[category].map((notice) => (
                      <CarouselItem key={notice.id} className="basis-full md:basis-1/2 lg:basis-1/3 pl-4 md:pl-6">
                        <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-[1.03]">
                          <div className="aspect-[4/3] relative overflow-hidden">
                            <img
                              src={notice.imageUrl}
                              alt={notice.title}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="p-4 text-center">
                            <h3 className="text-lg font-semibold">{notice.title}</h3>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
                
                <div className="flex justify-center mt-8 gap-4">
                  <CarouselPrevious className="static transform-none shadow-md hover:bg-yellow-400 hover:text-black" />
                  <CarouselNext className="static transform-none shadow-md hover:bg-yellow-400 hover:text-black" />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default NoticesSection;
