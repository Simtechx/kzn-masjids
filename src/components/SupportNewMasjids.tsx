
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HandHeart } from 'lucide-react';

interface NewMasjidProjectProps {
  name: string;
  location: string;
  image: string;
  completionPercentage: number;
}

const NewMasjidProject: React.FC<NewMasjidProjectProps> = ({ name, location, image, completionPercentage }) => {
  return (
    <Card className="hover:shadow-md transition-shadow overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 w-full bg-black/60 text-white p-2">
          <div className="text-sm">{completionPercentage}% Complete</div>
          <div className="w-full bg-gray-300 h-1.5 rounded-full">
            <div 
              className="bg-islamic-gold h-1.5 rounded-full" 
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold mb-1">{name}</h3>
        <p className="text-gray-600 text-sm">{location}</p>
      </CardContent>
    </Card>
  );
};

const SupportNewMasjids: React.FC = () => {
  const newProjects = [
    {
      name: "Masjid Al-Noor",
      location: "Phoenix, Durban",
      image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80",
      completionPercentage: 65
    },
    {
      name: "Masjid Al-Furqan",
      location: "Pietermaritzburg",
      image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&q=80",
      completionPercentage: 40
    },
    {
      name: "Musgrave Islamic Center",
      location: "Musgrave, Durban",
      image: "https://images.unsplash.com/photo-1551038247-3d9af20df552?auto=format&fit=crop&q=80",
      completionPercentage: 85
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-center text-3xl font-bold mb-2 text-islamic-blue">
          Support New and Upcoming Masjid Projects Near You
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Help build the future of our community by contributing to these new masjid projects.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {newProjects.map((project, index) => (
            <NewMasjidProject
              key={index}
              name={project.name}
              location={project.location}
              image={project.image}
              completionPercentage={project.completionPercentage}
            />
          ))}
        </div>
        
        <div className="text-center">
          <Button className="bg-islamic-gold hover:bg-islamic-gold/90 text-black font-medium py-3 px-8 rounded-md text-lg">
            <HandHeart className="mr-2" />
            Contribute Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SupportNewMasjids;
