
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Search, Filter, AudioLines, Headphones, Speaker } from 'lucide-react';

interface Recording {
  id: number;
  title: string;
  speaker: string;
  masjid: string;
  date: string;
  duration: string;
  imageUrl: string;
  isLive?: boolean;
}

const recordings: Recording[] = [
  {
    id: 1,
    title: "Importance of Ramadan",
    speaker: "Sheikh Abdullah",
    masjid: "Westville Masjid",
    date: "May 5, 2025",
    duration: "45:20",
    imageUrl: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80",
    isLive: true
  },
  {
    id: 2,
    title: "Understanding Tawheed",
    speaker: "Mufti Ibrahim",
    masjid: "Grey Street Masjid",
    date: "May 3, 2025",
    duration: "32:15",
    imageUrl: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "Purification of the Heart",
    speaker: "Sheikh Zaid",
    masjid: "Overport Masjid",
    date: "April 28, 2025",
    duration: "58:00",
    imageUrl: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80"
  }
];

const MasjidAudio = () => {
  const playRecording = (recording: Recording) => {
    console.log(`Playing recording: ${recording.title}`);
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold mb-2 text-islamic-blue">Masjid Audio</h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Listen to live broadcasts, lectures and recent recordings from masjids across KwaZulu-Natal.
        </p>

        <Tabs defaultValue="recent">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="recent">Recent Recordings</TabsTrigger>
              <TabsTrigger value="live">Live Now</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
            </TabsList>
            
            <div className="flex space-x-2">
              <button className="p-2 bg-white rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50">
                <Search size={18} />
              </button>
              <button className="p-2 bg-white rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50">
                <Filter size={18} />
              </button>
            </div>
          </div>
          
          <TabsContent value="recent" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recordings.map((recording) => (
                <Card key={recording.id} className="overflow-hidden">
                  <div className="h-40 relative">
                    <img 
                      src={recording.imageUrl} 
                      alt={recording.title}
                      className="w-full h-full object-cover"
                    />
                    {recording.isLive && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-md text-xs flex items-center">
                        <span className="animate-pulse mr-1 inline-block h-2 w-2 rounded-full bg-white"></span>
                        LIVE
                      </div>
                    )}
                    <button 
                      onClick={() => playRecording(recording)}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity"
                    >
                      <div className="bg-white rounded-full p-3">
                        <Play size={24} className="text-islamic-green" />
                      </div>
                    </button>
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-lg">{recording.title}</CardTitle>
                    <CardDescription className="text-islamic-green">{recording.speaker}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex justify-between text-sm">
                      <span>{recording.masjid}</span>
                      <span className="text-gray-500">{recording.duration}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="live">
            <div className="bg-white rounded-lg p-8 text-center">
              <AudioLines size={48} className="mx-auto mb-4 text-islamic-green opacity-50" />
              <h3 className="text-xl font-medium mb-2">No Live Streams Currently Available</h3>
              <p className="text-gray-500">Check back later for live broadcasts from various masjids</p>
            </div>
          </TabsContent>
          
          <TabsContent value="featured">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center">
                    <Headphones className="mr-2 text-islamic-green" />
                    <CardTitle>Featured Collections</CardTitle>
                  </div>
                  <CardDescription>Popular series and collections</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="p-2 hover:bg-gray-50 rounded flex justify-between">
                      <span>Ramadan 2025 Series</span>
                      <span className="text-gray-500">12 recordings</span>
                    </li>
                    <li className="p-2 hover:bg-gray-50 rounded flex justify-between">
                      <span>Stories of the Prophets</span>
                      <span className="text-gray-500">8 recordings</span>
                    </li>
                    <li className="p-2 hover:bg-gray-50 rounded flex justify-between">
                      <span>Fiqh of Salah</span>
                      <span className="text-gray-500">5 recordings</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center">
                    <Speaker className="mr-2 text-islamic-green" />
                    <CardTitle>Popular Speakers</CardTitle>
                  </div>
                  <CardDescription>Most listened speakers</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="p-2 hover:bg-gray-50 rounded flex justify-between">
                      <span>Sheikh Abdullah</span>
                      <span className="text-gray-500">24 recordings</span>
                    </li>
                    <li className="p-2 hover:bg-gray-50 rounded flex justify-between">
                      <span>Mufti Ibrahim</span>
                      <span className="text-gray-500">18 recordings</span>
                    </li>
                    <li className="p-2 hover:bg-gray-50 rounded flex justify-between">
                      <span>Sheikh Zaid</span>
                      <span className="text-gray-500">15 recordings</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MasjidAudio;
