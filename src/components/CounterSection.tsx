
import React, { useEffect, useState, useRef } from 'react';
import { Building2, Church, MapPin, Users } from 'lucide-react';

interface FlipDigitProps {
  digit: number;
}

const FlipDigit: React.FC<FlipDigitProps> = ({ digit }) => {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          {digit}
        </div>
      </div>
    </div>
  );
};

interface FlipCounterProps {
  end: number;
  label: string;
  icon: React.ReactNode;
  delay?: number;
}

const FlipCounter: React.FC<FlipCounterProps> = ({ end, label, icon, delay = 0 }) => {
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

  // Convert number to array of digits
  const digits = count.toString().split('').map(Number);

  return (
    <div 
      className="flex flex-col items-center transform transition-all duration-700 hover:scale-105" 
      ref={counterRef}
    >
      <div className="mb-4 text-teal-800 bg-white/90 rounded-full p-4 shadow-lg">
        {icon}
      </div>
      <div className="flip-counter-container">
        {digits.map((digit, index) => (
          <FlipDigit key={index} digit={digit} />
        ))}
      </div>
      <div className="text-xl text-teal-800 font-medium mt-3">{label}</div>
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
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-teal-800">
            KwaZulu-Natal Prayer Spaces
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the growing number of prayer spaces across the province.
          </p>
          <div className="w-24 h-1 bg-islamic-gold mx-auto mt-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <FlipCounter 
            end={masjidsCount} 
            label="Masjids" 
            icon={<Church size={48} strokeWidth={1.5} className="text-teal-700" />}
            delay={0}
          />
          <FlipCounter 
            end={musallasCount} 
            label="Musallas" 
            icon={<Building2 size={48} strokeWidth={1.5} className="text-teal-700" />}
            delay={200}
          />
          <FlipCounter 
            end={regionsCount} 
            label="Regions" 
            icon={<MapPin size={48} strokeWidth={1.5} className="text-teal-700" />}
            delay={400}
          />
          <FlipCounter 
            end={totalCount} 
            label="Total Prayer Spaces" 
            icon={<Users size={48} strokeWidth={1.5} className="text-teal-700" />}
            delay={600}
          />
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
