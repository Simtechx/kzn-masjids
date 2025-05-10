
import React from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';

// Sample notices data
const noticesData = [
  {
    id: 1,
    title: "Overnight Programme of Hazrat Mufti",
    subtitle: "17-18 May 2025 at Madrasah Ta'leemudeen",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Programme at Musjid Fatimah",
    subtitle: "Sunday, 4th May 2025 after Fajr",
    image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "Programme of Hazrat Moulana Muhammad Ilyas Patel",
    subtitle: "Tuesday 06 May at Musalla An Noor after Esha",
    image: "https://images.unsplash.com/photo-1536048810607-3dc7f86981cb?auto=format&fit=crop&q=80"
  }
];

const NoticesSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-center text-3xl font-bold mb-2 text-teal-800">NOTICES</h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Stay informed about the latest events, programs, and inspirational content
        </p>
        
        <div className="max-w-4xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {noticesData.map((notice) => (
                <CarouselItem key={notice.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md h-full">
                    <div className="h-48 bg-teal-700 bg-opacity-10">
                      <img 
                        src={notice.image} 
                        alt={notice.title} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-teal-800 mb-2">
                        {notice.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {notice.subtitle}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6">
              <CarouselPrevious className="relative static bg-teal-800 text-white hover:bg-teal-900 hover:text-white h-10 w-10 mr-2" />
              <CarouselNext className="relative static bg-teal-800 text-white hover:bg-teal-900 hover:text-white h-10 w-10" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default NoticesSection;
