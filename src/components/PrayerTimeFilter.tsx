
import React, { useState } from 'react';
import { Clock, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TimeBlock {
  id: string;
  prayer: string;
  time: string;
  count: number;
  color: string;
  bgColor: string;
  selectedColor: string;
}

interface PrayerTimeFilterProps {}

const PrayerTimeFilter: React.FC<PrayerTimeFilterProps> = () => {
  const [selectedTimeBlock, setSelectedTimeBlock] = useState<string | null>(null);

  const timeBlocks: TimeBlock[] = [
    { 
      id: 'fajr', 
      prayer: 'Fajr', 
      time: '05:45', 
      count: 23, 
      color: 'text-pink-600',
      bgColor: 'bg-pink-50 border-pink-200',
      selectedColor: 'bg-pink-600 border-pink-700 text-white'
    },
    { 
      id: 'dhuhr', 
      prayer: 'Dhuhr', 
      time: '12:30', 
      count: 45, 
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 border-amber-200',
      selectedColor: 'bg-amber-600 border-amber-700 text-white'
    },
    { 
      id: 'asr', 
      prayer: 'Asr', 
      time: '15:45', 
      count: 34, 
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 border-emerald-200',
      selectedColor: 'bg-emerald-600 border-emerald-700 text-white'
    },
    { 
      id: 'isha', 
      prayer: 'Isha', 
      time: '19:30', 
      count: 28, 
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 border-indigo-200',
      selectedColor: 'bg-indigo-600 border-indigo-700 text-white'
    }
  ];

  const handleTimeBlockClick = (timeBlockId: string) => {
    setSelectedTimeBlock(selectedTimeBlock === timeBlockId ? null : timeBlockId);
  };

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Prayer Time Search
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find masjids by their prayer times across KwaZulu-Natal
          </p>
        </div>

        {/* Vertical Time Blocks */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {timeBlocks.map((block) => {
            const isSelected = selectedTimeBlock === block.id;
            return (
              <div
                key={block.id}
                onClick={() => handleTimeBlockClick(block.id)}
                className={`p-6 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                  isSelected 
                    ? block.selectedColor
                    : `${block.bgColor} hover:shadow-md`
                }`}
              >
                <div className="text-center">
                  <div className={`text-sm font-medium mb-2 ${
                    isSelected ? 'text-white' : block.color
                  }`}>
                    {block.prayer}
                  </div>
                  <div className={`text-2xl font-bold mb-2 ${
                    isSelected ? 'text-white' : 'text-gray-800'
                  }`}>
                    {block.time}
                  </div>
                  <Badge variant="outline" className={`text-xs ${
                    isSelected 
                      ? 'bg-white text-gray-800 border-white' 
                      : 'bg-white text-gray-600 border-gray-300'
                  }`}>
                    {block.count} masjids
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Time Results */}
        {selectedTimeBlock && (
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Masjids with {timeBlocks.find(b => b.id === selectedTimeBlock)?.prayer} at{' '}
              {timeBlocks.find(b => b.id === selectedTimeBlock)?.time}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Sample masjid cards */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Masjid Al-Noor {i}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    Durban, KwaZulu-Natal
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {timeBlocks.find(b => b.id === selectedTimeBlock)?.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PrayerTimeFilter;
