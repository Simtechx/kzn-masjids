
import React, { useEffect, useState, useRef } from 'react';
import { Building2, Church, MapPin, Users } from 'lucide-react';

interface CounterProps {
  end: number;
  label: string;
  icon: React.ReactNode;
  delay?: number;
}

const Counter: React.FC<CounterProps> = ({ end, label, icon, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const countingDone = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countingDone.current) {
          countingDone.current = true;
          
          // Apply delay before starting counter
          setTimeout(() => {
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
          }, delay);
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
  }, [end, delay]);

  return (
    <div 
      className="flex flex-col items-center transform transition-all duration-700 hover:scale-105" 
      ref={counterRef}
    >
      <div className="mb-4 text-teal-800 bg-white/90 rounded-full p-6 shadow-lg">
        {icon}
      </div>
      <div className="text-4xl md:text-5xl font-bold text-white mb-2 animate-count drop-shadow-lg">
        {count}
      </div>
      <div className="text-xl text-white font-medium drop-shadow-md">{label}</div>
    </div>
  );
};

const CounterSection = () => {
  // Mock data for the counters
  const masjidsCount = 190;
  const musallasCount = 87;
  const regionsCount = 6;
  const totalCount = masjidsCount + musallasCount;

  return (
    <section 
      className="py-20 px-4 bg-cover bg-center bg-no-repeat relative"
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80')" 
      }}
    >
      <div className="absolute inset-0 bg-teal-900/80 backdrop-blur-sm"></div>
      
      {/* Durban-themed watermark */}
      <div className="absolute inset-0 bg-mosque-watermark bg-center opacity-10"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg">
            KwaZulu-Natal Prayer Spaces
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto">
            Discover the growing number of prayer spaces across the province.
          </p>
          <div className="w-24 h-1 bg-islamic-gold mx-auto mt-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <Counter 
            end={masjidsCount} 
            label="Masjids" 
            icon={<Church size={48} strokeWidth={1.5} />}
            delay={0}
          />
          <Counter 
            end={musallasCount} 
            label="Musallas" 
            icon={<Building2 size={48} strokeWidth={1.5} />}
            delay={200}
          />
          <Counter 
            end={regionsCount} 
            label="Regions" 
            icon={<MapPin size={48} strokeWidth={1.5} />}
            delay={400}
          />
          <Counter 
            end={totalCount} 
            label="Total Prayer Spaces" 
            icon={<Users size={48} strokeWidth={1.5} />}
            delay={600}
          />
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
