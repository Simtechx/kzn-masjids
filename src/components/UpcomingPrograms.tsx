
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Program {
  id: number;
  title: string;
  date: string;
  masjid: string;
  images: string[];
}

const programs: Program[] = [
  {
    id: 1,
    title: "Jummah Special Lecture Series",
    date: "Every Friday @ 12:30pm",
    masjid: "Westville Masjid",
    images: [
      "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 2,
    title: "Tafsir Program & Qur'an Study",
    date: "Sundays @ 6:30pm",
    masjid: "Grey Street Masjid",
    images: [
      "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&q=80",
      "/lovable-uploads/ac66a635-4746-468d-8cfa-a155c79d75ed.png"
    ]
  },
  {
    id: 3,
    title: "Youth Development Workshop",
    date: "Saturdays @ 9:00am",
    masjid: "Reservoir Hills Masjid",
    images: [
      "https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80"
    ]
  }
];

const UpcomingPrograms = () => {
  return (
    <div className="bg-white py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold mb-2 text-islamic-dark-green">Upcoming Programs</h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Stay updated with lectures, workshops and events happening at masjids across KwaZulu-Natal.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((program) => (
            <div key={program.id} className="overflow-hidden rounded-lg shadow-lg">
              <Carousel className="w-full">
                <CarouselContent>
                  {program.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative h-64 w-full">
                        <img 
                          src={image} 
                          alt={`${program.title} - image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              <div className="p-5 bg-islamic-dark-green text-white">
                <h3 className="text-xl font-bold mb-1">{program.title}</h3>
                <div className="mb-1 text-islamic-gold">{program.date}</div>
                <p className="text-white/80">{program.masjid}</p>
                <button className="mt-3 bg-islamic-gold hover:bg-islamic-gold/90 text-black py-1 px-4 rounded-md text-sm">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingPrograms;
