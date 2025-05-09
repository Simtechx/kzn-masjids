
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Program {
  id: number;
  title: string;
  date: string;
  masjid: string;
  imageUrl: string;
}

const programs: Program[] = [
  {
    id: 1,
    title: "Jummah Special Lecture",
    date: "Friday, May 10 @ 12:30pm",
    masjid: "Westville Masjid",
    imageUrl: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Tafsir Program",
    date: "Sunday, May 12 @ 6:30pm",
    masjid: "Grey Street Masjid",
    imageUrl: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "Youth Workshop",
    date: "Saturday, May 18 @ 9:00am",
    masjid: "Reservoir Hills Masjid",
    imageUrl: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    title: "Importance of Ramadan",
    date: "Monday, May 20 @ 7:30pm",
    masjid: "Overport Masjid",
    imageUrl: "/lovable-uploads/ac66a635-4746-468d-8cfa-a155c79d75ed.png"
  }
];

const UpcomingPrograms = () => {
  return (
    <div className="bg-white py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold mb-2 text-islamic-blue">Upcoming Programs</h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Stay updated with lectures, workshops and events happening at masjids across KwaZulu-Natal.
        </p>
        
        <div className="relative px-12">
          <Carousel>
            <CarouselContent>
              {programs.map((program) => (
                <CarouselItem key={program.id} className="md:basis-1/2 lg:basis-1/3 p-2">
                  <div className="h-full rounded-lg shadow-md overflow-hidden relative">
                    <img 
                      src={program.imageUrl} 
                      alt={program.title}
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4">
                      <div className="text-white text-sm mb-1">{program.date}</div>
                      <h3 className="text-white text-xl font-bold mb-1">{program.title}</h3>
                      <p className="text-white/80 mb-2">{program.masjid}</p>
                      <button className="bg-islamic-gold hover:bg-islamic-gold/90 text-black py-1 px-4 rounded-md text-sm mt-2 w-max">
                        View Details
                      </button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default UpcomingPrograms;
