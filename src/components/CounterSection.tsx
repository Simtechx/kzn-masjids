
import React, { useEffect, useState, useRef } from 'react';
import { Building, Users, MapPin } from 'lucide-react';

interface CounterProps {
  end: number;
  label: string;
  icon: React.ReactNode;
}

const Counter: React.FC<CounterProps> = ({ end, label, icon }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const countingDone = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countingDone.current) {
          countingDone.current = true;
          let currentCount = 0;
          const duration = 2000; // 2 seconds
          const step = Math.ceil(end / (duration / 50)); // Update every 50ms
          
          const timer = setInterval(() => {
            currentCount += step;
            if (currentCount > end) {
              currentCount = end;
              clearInterval(timer);
            }
            setCount(currentCount);
          }, 50);
          
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [end]);

  return (
    <div className="flex flex-col items-center" ref={counterRef}>
      <div className="mb-4 text-teal-700">
        {icon}
      </div>
      <div className="text-4xl md:text-5xl font-bold text-teal-700 mb-2 animate-count">
        {count}
      </div>
      <div className="text-xl text-teal-600">{label}</div>
    </div>
  );
};

const CounterSection = () => {
  // Mock data for the counters
  const masjidsCount = 190;
  const musallasCount = 87;
  const totalCount = masjidsCount + musallasCount;

  return (
    <section className="py-16 px-4 bg-mosque-watermark bg-no-repeat bg-center bg-contain">
      <div className="container mx-auto relative z-10">
        <div className="bg-white/90 py-12 px-6 rounded-lg shadow-lg">
          <h2 className="text-center text-3xl font-bold mb-2 text-teal-700">KZN Prayer Spaces</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Discover the growing number of prayer spaces across KwaZulu-Natal province.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Counter 
              end={masjidsCount} 
              label="Masjids" 
              icon={<Building size={48} />} 
            />
            <Counter 
              end={musallasCount} 
              label="Musallas" 
              icon={<MapPin size={48} />} 
            />
            <Counter 
              end={totalCount} 
              label="Total Prayer Spaces" 
              icon={<Users size={48} />} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
