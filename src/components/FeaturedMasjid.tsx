
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MasjidProps {
  masjid: {
    id: string;
    name: string;
    location: string;
    region: string;
    image: string;
    prayerTimes?: {
      fajr: string;
      dhuhr: string;
      asr: string;
      maghrib: string;
      isha: string;
    };
  };
}

const FeaturedMasjid = ({ masjid }: MasjidProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      <div 
        className="h-48 bg-cover bg-center" 
        style={{ 
          backgroundImage: `url(${masjid.image})` 
        }}
      ></div>
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{masjid.name}</h3>
        <div className="flex items-center mb-3">
          <MapPin size={16} className="text-islamic-green mr-2" />
          <span className="text-gray-600">{masjid.location}</span>
        </div>
        
        {masjid.prayerTimes && (
          <div className="mb-4 p-3 bg-islamic-cream rounded-md">
            <div className="flex items-center mb-2">
              <Clock size={16} className="text-islamic-blue mr-2" />
              <span className="text-islamic-blue font-medium">Today's Prayer Times</span>
            </div>
            <div className="grid grid-cols-5 gap-1 text-center text-xs">
              <div className="bg-islamic-green/10 p-1 rounded">
                <div className="font-medium text-islamic-dark-green">Fajr</div>
                <div>{masjid.prayerTimes.fajr}</div>
              </div>
              <div className="bg-islamic-green/10 p-1 rounded">
                <div className="font-medium text-islamic-dark-green">Dhuhr</div>
                <div>{masjid.prayerTimes.dhuhr}</div>
              </div>
              <div className="bg-islamic-green/10 p-1 rounded">
                <div className="font-medium text-islamic-dark-green">Asr</div>
                <div>{masjid.prayerTimes.asr}</div>
              </div>
              <div className="bg-islamic-green/10 p-1 rounded">
                <div className="font-medium text-islamic-dark-green">Maghrib</div>
                <div>{masjid.prayerTimes.maghrib}</div>
              </div>
              <div className="bg-islamic-green/10 p-1 rounded">
                <div className="font-medium text-islamic-dark-green">Isha</div>
                <div>{masjid.prayerTimes.isha}</div>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{masjid.region} Region</span>
          <Link to={`/masjid/${masjid.id}`}>
            <Button variant="outline" className="text-islamic-green border-islamic-green hover:bg-islamic-green hover:text-white">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMasjid;
