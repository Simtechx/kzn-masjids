
import React from 'react';
import { Carousel } from '@/components/ui/carousel';
import { CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from "@/components/ui/aspect-ratio"

const NoticesSection = () => {
  // Mock data for notices with image URLs
  const notices = [
    {
      id: 1,
      title: 'Eid al-Adha Announcement',
      content: 'The date for Eid al-Adha has been confirmed. Join us for prayers and community celebrations.',
      imageUrl: 'https://images.unsplash.com/photo-1560264234-b5618a0bfb0c?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 2,
      title: 'New Islamic Studies Class',
      content: 'Register now for our new course on understanding the Quran. Limited seats available.',
      imageUrl: 'https://images.unsplash.com/photo-1579621956067-47f92835e927?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 3,
      title: 'Ramadan Donation Drive',
      content: 'Support our Ramadan food drive to help families in need. Donate today and make a difference.',
      imageUrl: 'https://images.unsplash.com/photo-1615319305984-56c7ab09959b?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-center text-3xl font-bold mb-8 text-teal-800">
          Notices
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {notices.map((notice) => (
            <Card key={notice.id} className="border-none shadow-xl overflow-hidden">
              <CardContent className="p-0">
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={notice.imageUrl}
                    alt={notice.title}
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{notice.title}</h3>
                  <p className="text-gray-600">{notice.content}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NoticesSection;
