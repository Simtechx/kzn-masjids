
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
  description: string;
}

const programs: Program[] = [
  {
    id: 1,
    title: "Jummah Special Lecture",
    date: "Friday, May 10 @ 12:30pm",
    masjid: "Westville Masjid",
    imageUrl: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80",
    description: "Join us for a special lecture on the importance of unity in Islam."
  },
  {
    id: 2,
    title: "Tafsir Program",
    date: "Sunday, May 12 @ 6:30pm",
    masjid: "Grey Street Masjid",
    imageUrl: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&q=80",
    description: "Weekly Tafsir program exploring Surah Al-Kahf."
  },
  {
    id: 3,
    title: "Youth Workshop",
    date: "Saturday, May 18 @ 9:00am",
    masjid: "Reservoir Hills Masjid",
    imageUrl: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&q=80",
    description: "Workshop focused on building Islamic leadership skills for youth."
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
                  <div className="h-full flex flex-col rounded-lg shadow-md overflow-hidden">
                    <div className="h-48 relative">
                      <img 
                        src={program.imageUrl} 
                        alt={program.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                        <span className="text-white font-medium text-sm">{program.date}</span>
                      </div>
                    </div>
                    <div className="p-4 flex-grow flex flex-col">
                      <h3 className="font-bold text-xl mb-1">{program.title}</h3>
                      <p className="text-islamic-green font-medium mb-2">{program.masjid}</p>
                      <p className="text-gray-600 text-sm flex-grow">{program.description}</p>
                      <button className="mt-4 bg-islamic-blue hover:bg-islamic-dark-blue text-white py-2 px-4 rounded-md text-sm transition-colors">
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
