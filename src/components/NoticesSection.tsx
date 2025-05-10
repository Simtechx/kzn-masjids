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
    {
      id: 4,
      title: 'Iftar Gathering',
      content: 'Join us for a community iftar gathering every Saturday during Ramadan.',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1664302521454-4959996c1915?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 5,
      title: 'Zakat Collection',
      content: 'Pay your Zakat with us and ensure it reaches those who need it most.',
      imageUrl: 'https://images.unsplash.com/photo-1606135787382-b3a299141698?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-center text-3xl font-bold mb-8 text-teal-800">
          Notices & Announcements
        </h2>
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {notices.map((notice) => (
              <CarouselItem key={notice.id} className="md:w-1/2 lg:w-1/3">
                <Card className="border-none shadow-xl">
                  <CardContent className="p-0">
                    <AspectRatio ratio={16 / 9}>
                      <img
                        src={notice.imageUrl}
                        alt={notice.title}
                        className="object-cover rounded-t-md"
                      />
                    </AspectRatio>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{notice.title}</h3>
                      <p className="text-gray-600">{notice.content}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    </section>
  );
};

export default NoticesSection;
