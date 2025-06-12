
import React from 'react';
import { Calendar, MapPin, Clock, Users, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface Notice {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  masjid: string;
  category: 'Event' | 'Announcement' | 'Program' | 'Notice';
  image: string;
  isUrgent?: boolean;
}

const mockNotices: Notice[] = [
  {
    id: 1,
    title: "Community Eid Celebration",
    description: "Join us for a special Eid celebration with the entire community. Food, activities, and prayers included.",
    date: "2024-07-15",
    time: "09:00 AM",
    location: "Community Hall",
    masjid: "Central Masjid",
    category: "Event",
    image: "/lovable-uploads/0dd2dcb6-8779-4e05-ba5f-7480a3cd378b.png",
    isUrgent: true
  },
  {
    id: 2,
    title: "Weekly Islamic Studies",
    description: "Join our weekly Islamic studies class every Friday after Maghrib prayer. All ages welcome.",
    date: "2024-07-12",
    time: "19:30 PM",
    location: "Masjid Hall",
    masjid: "Westville Masjid",
    category: "Program",
    image: "/lovable-uploads/36eb50b5-3fa7-41f9-bb30-728fa2a10fc7.png"
  },
  {
    id: 3,
    title: "Ramadan Food Drive",
    description: "Help us collect food items for underprivileged families during Ramadan. Drop-off points available.",
    date: "2024-07-10",
    time: "All Day",
    location: "Multiple Locations",
    masjid: "Community Initiative",
    category: "Announcement",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&h=600&fit=crop"
  },
  {
    id: 4,
    title: "Youth Football Tournament",
    description: "Annual youth football tournament for ages 12-18. Registration now open.",
    date: "2024-07-20",
    time: "14:00 PM",
    location: "Sports Complex",
    masjid: "Phoenix Masjid",
    category: "Event",
    image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=800&h=600&fit=crop"
  },
  {
    id: 5,
    title: "Quranic Recitation Competition",
    description: "Annual Quranic recitation competition for children and adults. Prizes to be won.",
    date: "2024-07-25",
    time: "16:00 PM",
    location: "Main Prayer Hall",
    masjid: "Asherville Masjid",
    category: "Program",
    image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=800&h=600&fit=crop"
  },
  {
    id: 6,
    title: "Masjid Maintenance Notice",
    description: "The masjid will be closed for maintenance on Sunday. Please use the nearby Musalla for prayers.",
    date: "2024-07-14",
    time: "All Day",
    location: "Durban Central Masjid",
    masjid: "Durban Central Masjid",
    category: "Notice",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&h=600&fit=crop"
  }
];

const NoticesSection: React.FC = () => {
  const isMobile = useIsMobile();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Event': return 'bg-blue-500 text-white';
      case 'Announcement': return 'bg-green-500 text-white';
      case 'Program': return 'bg-purple-500 text-white';
      case 'Notice': return 'bg-orange-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#062C25] mb-4">
            Community Notices & Events
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest announcements, events, and programs happening 
            across KwaZulu-Natal's Islamic community.
          </p>
        </div>

        {/* Notices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockNotices.map((notice) => (
            <Card key={notice.id} className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img 
                  src={notice.image} 
                  alt={notice.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge className={getCategoryColor(notice.category)}>
                    {notice.category}
                  </Badge>
                </div>
                {notice.isUrgent && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-red-500 text-white animate-pulse">
                      URGENT
                    </Badge>
                  </div>
                )}
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-teal-700 line-clamp-2 group-hover:text-teal-800 transition-colors">
                  {notice.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                <p className="text-gray-600 text-sm line-clamp-3">
                  {notice.description}
                </p>

                {/* Event Details */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-700">
                    <Calendar className="h-4 w-4 mr-2 text-teal-600" />
                    <span>{formatDate(notice.date)}</span>
                    <Clock className="h-4 w-4 ml-4 mr-2 text-teal-600" />
                    <span>{notice.time}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-700">
                    <MapPin className="h-4 w-4 mr-2 text-teal-600" />
                    <span className="line-clamp-1">{notice.location}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-700">
                    <Users className="h-4 w-4 mr-2 text-teal-600" />
                    <span className="line-clamp-1">{notice.masjid}</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full bg-teal-50 border-teal-200 text-teal-700 hover:bg-teal-100 hover:border-teal-300"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-10">
          <Button 
            size="lg" 
            className="bg-teal-600 hover:bg-teal-700 text-white px-8"
          >
            View All Notices
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NoticesSection;
